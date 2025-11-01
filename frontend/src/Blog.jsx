// src/ModernBlogPlatform.jsx
import { useState } from "react";
import {
  Menu,
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  Plus,
  X,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock auth – replace with Firebase/Supabase later                    */
/* ------------------------------------------------------------------ */
const mockCreateAccount = async () => {
  return
};

/* ------------------------------------------------------------------ */
const ModernBlogPlatform = () => {

  /* ---------- page state ---------- */
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ---------- signup modal state ---------- */
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openWriteModal = () => setShowSignup(true);
  const closeModal = () => {
    setShowSignup(false);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Mock signup - replace with real API
      await new Promise(r => setTimeout(r, 800));
      
      if (!email.includes('@')) throw new Error('Invalid email');
      if (password.length < 6) throw new Error('Password too short');
      
      localStorage.setItem('bloom_admin_token', 'demo-' + Date.now());
      
      // Redirect to admin using window.location (since we're outside Router context here)
      window.location.href = '/admin';
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  /* ------------------------------------------------------------------ */
  /* Data (unchanged)                                                   */
  /* ------------------------------------------------------------------ */
  const authors = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Design Lead & Creative Writer",
      bio: "Exploring the intersection of technology, design, and human experience through thoughtful storytelling",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      coverImage:
        "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
      color: "#6366f1",
      lightColor: "#eef2ff",
      totalPosts: 47,
      totalSeries: 8,
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      role: "UX Researcher & Storyteller",
      bio: "Sharing insights on user behavior, product design, and the art of creating meaningful digital experiences",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      coverImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600",
      color: "#ec4899",
      lightColor: "#fdf2f8",
      totalPosts: 52,
      totalSeries: 10,
    },
  ];

  const allPosts = {
    1: [
      {
        id: 1,
        title: "The Art of Minimalist Interface Design",
        series: "Design Philosophy",
        excerpt:
          "How removing elements can create more powerful user experiences that resonate deeply with your audience and drive meaningful engagement",
        date: "2 days ago",
        readTime: "8 min",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
        tags: ["Design", "UX", "Minimalism"],
        views: "2.4K",
        content: `Minimalism in interface design isn't about removing features—it's about purposeful clarity. Every element should earn its place through function, not decoration.

When we strip away the unnecessary, what remains becomes powerful. White space isn't empty; it's breathing room for ideas. Typography isn't just text; it's a conversation with your user.

The best interfaces disappear, leaving only the experience. They don't shout for attention—they guide with confidence and restraint.

Start by questioning everything. Does this button need to be blue? Does this animation add value? Does this text clarify or complicate?

Minimalism is maximalism in disguise—maximum impact through minimum means.`,
      },
      {
        id: 2,
        title: "Building Emotional Connections Through Typography",
        series: "Visual Language",
        excerpt:
          "Typography is more than aesthetics—it's the voice of your brand speaking directly to users through every letterform",
        date: "5 days ago",
        readTime: "12 min",
        image:
          "https://images.unsplash.com/photo-1506485338023-6ce5f36692df?w=800",
        tags: ["Typography", "Branding", "Design"],
        views: "3.1K",
        content: "Typography shapes perception before a single word is read...",
      },
      {
        id: 3,
        title: "Micro-interactions: The Secret Sauce of Delightful Apps",
        series: "UX Mastery",
        excerpt:
          "Small animations and interactions that make users fall in love with your product, one delightful moment at a time",
        date: "1 week ago",
        readTime: "10 min",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
        tags: ["Animation", "UX", "Mobile"],
        views: "4.2K",
        content:
          "Micro-interactions are the secret handshake between your product and its users...",
      },
    ],
    2: [
      {
        id: 4,
        title: "Understanding User Psychology in Product Design",
        series: "UX Research",
        excerpt:
          "Deep dive into cognitive biases and psychological principles that shape how users interact with digital products",
        date: "1 day ago",
        readTime: "15 min",
        image:
          "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800",
        tags: ["Psychology", "UX", "Research"],
        views: "5.1K",
        content: "User psychology is the foundation of great product design...",
      },
      {
        id: 5,
        title: "The Future of Voice User Interfaces",
        series: "Emerging Tech",
        excerpt:
          "How conversational design is reshaping the way we interact with technology and what designers need to know",
        date: "4 days ago",
        readTime: "11 min",
        image:
          "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800",
        tags: ["Voice UI", "Future", "Design"],
        views: "3.8K",
        content: "Voice interfaces are changing everything we know about design...",
      },
    ],
  };

  /* ------------------------------------------------------------------ */
  /* Page components                                                    */
  /* ------------------------------------------------------------------ */
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ---------- Navigation ---------- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Bloom
              </h1>

              {/* Desktop menu */}
              <div className="hidden md:flex items-center gap-8">
                <button className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
                  Explore
                </button>
                <button className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
                  Writers
                </button>
                <button className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
                  About
                </button>

                {/* WRITE BUTTON */}
                <button
                  onClick={openWriteModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <Plus size={18} />
                  Write
                </button>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="text-slate-600" size={24} />
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <button className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                Explore
              </button>
              <button className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                Writers
              </button>
              <button className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                About
              </button>
              <button
                onClick={openWriteModal}
                className="block w-full text-left px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-medium"
              >
                Write
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <Sparkles className="text-indigo-600" size={16} />
            <span className="text-sm text-indigo-700 font-medium">
              Curated stories from creative minds
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Discover Stories That
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Inspire &amp; Inform
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Read thoughtful articles from talented writers exploring design,
            technology, and creativity
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search articles, topics, or writers..."
                className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-all shadow-sm focus:shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Writers Section ---------- */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              Our Writers
            </h3>
            <p className="text-lg text-slate-600">
              Choose a writer and explore their collection of stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {authors.map((author) => (
              <div
                key={author.id}
                onClick={() => {
                  setSelectedAuthor(author);
                  setCurrentPage("author-blog");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition-all hover:shadow-2xl"
              >
                {/* Cover */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={author.coverImage}
                    alt={author.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundColor: author.color }}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="relative -mt-20 mb-6">
                    <div
                      className="inline-block p-1 rounded-2xl"
                      style={{ backgroundColor: author.lightColor }}
                    >
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-xl"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {author.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: author.color }}
                  >
                    {author.role}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {author.bio}
                  </p>

                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {author.totalPosts}
                      </p>
                      <p className="text-sm text-slate-500">Articles</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {author.totalSeries}
                      </p>
                      <p className="text-sm text-slate-500">Series</p>
                    </div>
                  </div>

                  <button
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                    style={{ backgroundColor: author.color }}
                  >
                    Read {author.name.split(" ")[0]}'s Articles
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Trending Section ---------- */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="text-indigo-600" size={24} />
            <h3 className="text-2xl font-bold text-slate-900">
              Trending This Week
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allPosts[1].slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedAuthor(authors[0]);
                  setSelectedPost(post);
                  setCurrentPage("post");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: authors[0].color }}
                    >
                      {post.series}
                    </span>
                    <span className="text-sm text-slate-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={authors[0].avatar}
                      alt={authors[0].name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {authors[0].name}
                      </p>
                      <p className="text-xs text-slate-500">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Bloom
              </h4>
              <p className="text-slate-600 text-sm">
                A space for thoughtful writing
              </p>
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-600">
              <button className="hover:text-slate-900 transition-colors">
                About
              </button>
              <button className="hover:text-slate-900 transition-colors">
                Contact
              </button>
              <button className="hover:text-slate-900 transition-colors">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const AuthorBlogPage = () => {
    const posts = allPosts[selectedAuthor.id] || [];

    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage("home")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowRight className="rotate-180" size={20} />
                <span className="font-medium">Back to Home</span>
              </button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Bloom
              </h1>
              <div className="w-24" />
            </div>
          </div>
        </nav>

        {/* Author Header */}
        <section
          className="px-6 py-12"
          style={{ backgroundColor: selectedAuthor.lightColor }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative flex-shrink-0">
                <img
                  src={selectedAuthor.avatar}
                  alt={selectedAuthor.name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-xl border-4 border-white"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                  {selectedAuthor.name}
                </h1>
                <p
                  className="text-lg font-semibold mb-4"
                  style={{ color: selectedAuthor.color }}
                >
                  {selectedAuthor.role}
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6 max-w-2xl">
                  {selectedAuthor.bio}
                </p>

                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedAuthor.totalPosts}
                    </p>
                    <p className="text-sm text-slate-600">
                      Articles Published
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedAuthor.totalSeries}
                    </p>
                    <p className="text-sm text-slate-600">Series</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              All Articles
            </h2>

            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    setCurrentPage("post");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="md:w-80 flex-shrink-0">
                      <div className="relative h-56 rounded-xl overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: selectedAuthor.color }}
                        >
                          {post.series}
                        </span>
                        <span className="text-sm text-slate-500">
                          {post.readTime} read
                        </span>
                        <span className="text-sm text-slate-500">
                          • {post.views} views
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-slate-500">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const PostPage = () => (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage("author-blog")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowRight className="rotate-180" size={20} />
              <span className="font-medium">
                Back to {selectedAuthor.name}
              </span>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Bloom
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
              style={{ backgroundColor: selectedAuthor.color }}
            >
              {selectedPost.series}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-8 border-b border-slate-200">
              <img
                src={selectedAuthor.avatar}
                alt={selectedAuthor.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900">
                  {selectedAuthor.name}
                </p>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime} read</span>
                  <span>•</span>
                  <span>{selectedPost.views} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {selectedPost.content.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-700 leading-relaxed mb-6">
                {p}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <div
            className="mt-12 p-8 rounded-2xl"
            style={{ backgroundColor: selectedAuthor.lightColor }}
          >
            <div className="flex items-start gap-6">
              <img
                src={selectedAuthor.avatar}
                alt={selectedAuthor.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">
                  Written by
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedAuthor.name}
                </h3>
                <p className="text-slate-700 mb-4">{selectedAuthor.bio}</p>
                <button
                  onClick={() => setCurrentPage("author-blog")}
                  className="px-6 py-2.5 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                  style={{ backgroundColor: selectedAuthor.color }}
                >
                  View All Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <>
      {currentPage === "home" && <HomePage />}
      {currentPage === "author-blog" && <AuthorBlogPage />}
      {currentPage === "post" && <PostPage />}

      {/* ---------- SIGNUP MODAL ---------- */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Create Writer Account
            </h2>
            <p className="text-slate-600 mb-6">
              Get instant access to publish
            </p>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account & Write"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernBlogPlatform;