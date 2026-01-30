import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET = process.env.JWT_SECRET as string;
const MONGO_URL = process.env.MONGODB_URI as string;

if (!JWT_SECRET || !MONGO_URL) {
  console.error('ENV not configured');
  process.exit(1);
}

mongoose.connect(MONGO_URL).then(() => {
  console.log('MongoDB connected');
});

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  email: String,
  name: String,
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  title: String,
  text: String,
  image: String,
  authorId: mongoose.Schema.Types.ObjectId,
  authorLogin: String,
  createdAt: { type: Date, default: Date.now },
  likes: [mongoose.Schema.Types.ObjectId]
});

const CommentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  authorId: mongoose.Schema.Types.ObjectId,
  authorLogin: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

const app = express();
app.use(cors());
app.use(express.json());

const auth = (req: any, res: any, next: any) => {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  try {
    req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
};

app.post('/api/user/create', async (req, res) => {
  const login = req.body.login || req.body.email;
  const { password, name, email } = req.body;

  if (!login || !password || !name) return res.sendStatus(400);
  if (await User.findOne({ login })) return res.sendStatus(400);

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    login,
    email: email ?? login,
    name,
    password: hash
  });

  res.json({ ok: true });
});

app.post('/api/user/auth', async (req, res) => {
  const { login, password } = req.body;
  const user: any = await User.findOne({ login });
  if (!user) return res.sendStatus(401);

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign(
    { userId: user._id.toString(), login: user.login },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

app.get('/api/posts', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments();
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ posts, total, page, pages: Math.ceil(total / limit) });
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.sendStatus(404);
  res.json(post);
});

app.post('/api/posts', auth, async (req: any, res) => {
  const post = await Post.create({
    title: req.body.title,
    text: req.body.text,
    image: req.body.image,
    authorId: req.user.userId,
    authorLogin: req.user.login
  });
  res.json(post);
});

app.put('/api/posts/:id', auth, async (req: any, res) => {
  const post: any = await Post.findById(req.params.id);
  if (!post || post.authorId.toString() !== req.user.userId)
    return res.sendStatus(403);

  post.title = req.body.title;
  post.text = req.body.text;
  post.image = req.body.image;
  await post.save();

  res.json({ ok: true });
});

app.delete('/api/posts/:id', auth, async (req: any, res) => {
  const post: any = await Post.findById(req.params.id);
  if (!post || post.authorId.toString() !== req.user.userId)
    return res.sendStatus(403);

  await post.deleteOne();
  res.json({ ok: true });
});

app.post('/api/posts/:id/like', auth, async (req: any, res) => {
  const post: any = await Post.findById(req.params.id);
  if (!post) return res.sendStatus(404);

  if (!post.likes.some((id: any) => id.toString() === req.user.userId)) {
    post.likes.push(req.user.userId);
    await post.save();
  }

  res.json({ likes: post.likes.length });
});

app.delete('/api/posts/:id/like', auth, async (req: any, res) => {
  const post: any = await Post.findById(req.params.id);
  if (!post) return res.sendStatus(404);

  post.likes = post.likes.filter(
    (id: any) => id.toString() !== req.user.userId
  );

  await post.save();
  res.json({ likes: post.likes.length });
});

app.get('/api/comments/:postId', async (req, res) => {
  res.json(await Comment.find({ postId: req.params.postId }));
});

app.post('/api/comments/:postId', auth, async (req: any, res) => {
  if (!req.body.text) return res.sendStatus(400);

  const comment = await Comment.create({
    postId: req.params.postId,
    authorId: req.user.userId,
    authorLogin: req.user.login,
    text: req.body.text
  });

  res.json(comment);
});

app.delete('/api/comments/:id', auth, async (req: any, res) => {
  const comment: any = await Comment.findById(req.params.id);
  if (!comment || comment.authorId.toString() !== req.user.userId)
    return res.sendStatus(403);

  await comment.deleteOne();
  res.json({ ok: true });
});

app.get('/api/user', auth, async (req: any, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.sendStatus(404);

  const postsCount = await Post.countDocuments({ authorId: user._id });

  res.json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    postsCount
  });
});

app.put('/api/user', auth, async (req: any, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) return res.sendStatus(404);

  user.name = req.body.name;
  user.email = req.body.email;
  await user.save();

  const postsCount = await Post.countDocuments({ authorId: user._id });

  res.json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    postsCount
  });
});

app.get('/api/user/posts', auth, async (req: any, res) => {
  const posts = await Post.find({ authorId: req.user.userId })
    .sort({ createdAt: -1 });
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
});
