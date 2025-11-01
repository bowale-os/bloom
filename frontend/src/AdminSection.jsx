// src/AdminSection.jsx
import React, { useState } from 'react';
import {
  BarChart3, FileText, BookOpen, TrendingUp, Settings, LogOut,
  Search, Plus, X, Eye, Edit, Trash2, Upload, Home, Clock
} from 'lucide-react';

const AdminSection = () => {
  // -----------------------------------------------------------------
  // 1. Hard-coded data (no props!)
  // -----------------------------------------------------------------
  const user = { name: 'Sarah Mitchell' };

  const authors = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
  ];

  const authorPosts = [
    {
      id: 1,
      title: 'The Art of Minimalist Interface Design',
      series: 'Design Philosophy',
      description: 'How removing elements can create powerful user experiences…',
      date: '2 days ago',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
      views: '2.4K',
      status: 'published',
    },
    {
      id: 2,
      title: 'Micro-interactions: The Secret Sauce',
      series: 'UX Mastery',
      description: 'Small animations that make users fall in love with your product…',
      date: '1 week ago',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      views: '4.2K',
      status: 'draft',
    },
    {
      id: 3,
      title: 'Understanding User Psychology',
      series: 'UX Research',
      description: 'Cognitive biases that shape how users interact with digital products…',
      date: '1 day ago',
      readTime: '15 min',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800',
      views: '5.1K',
      status: 'published',
    },
  ];

  const series = [
    {
      id: 1,
      title: 'Design Philosophy',
      description: 'Exploring minimalist and intentional design principles',
      image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
      color: 'from-indigo-500 to-indigo-600',
      posts: 12,
    },
    {
      id: 2,
      title: 'UX Mastery',
      description: 'Deep dives into interaction design and micro-interactions',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      color: 'from-pink-500 to-pink-600',
      posts: 8,
    },
  ];

  // -----------------------------------------------------------------
  // 2. State
  // -----------------------------------------------------------------
  const [currentView, setCurrentView] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState('post'); // 'post' | 'series'
  const [searchQuery, setSearchQuery] = useState('');

  // -----------------------------------------------------------------
  // 3. Stats (derived from hard-coded data)
  // -----------------------------------------------------------------
  const stats = {
    totalPosts: authorPosts.length,
    totalSeries: series.length,
    views: authorPosts.reduce(
      (acc, p) => acc + parseInt(p.views.replace(/[^\d]/g, ''), 10),
      0
    ),
    drafts: authorPosts.filter(p => p.status === 'draft').length,
  };

  // -----------------------------------------------------------------
  // 4. Modal helpers
  // -----------------------------------------------------------------
  const openModal = type => {
    setModalType(type);
    setShowCreateModal(true);
  };
  const closeModal = () => setShowCreateModal(false);

  // -----------------------------------------------------------------
  // 5. Render
  // -----------------------------------------------------------------
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* ---------- Sidebar ---------- */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-xl">
        <div className="p-8 border-b border-slate-200">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-1">
            Bloom
          </h1>
          <p className="text-slate-500 text-sm">Content Studio</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all group"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>

          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'posts', label: 'Posts', icon: FileText },
            { id: 'series', label: 'Series', icon: BookOpen },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-indigo-50 to-pink-50 text-indigo-700 border border-indigo-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            {authors[0] ? (
              <img
                src={authors[0].avatar}
                alt={user.name}
                className="w-10 h-10 rounded-xl object-cover shadow"
              />
            ) : (
              <div className="w-10 h-10 bg-slate-200 rounded-xl" />
            )}
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">Content Writer</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1 group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search posts, series, tags..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal('post')}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span>New Post</span>
              </button>

              <button
                onClick={() => openModal('series')}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all font-medium"
              >
                <Plus size={20} />
                <span>New Series</span>
              </button>
            </div>
          </div>
        </header>

        {/* ---------- Views ---------- */}
        <div className="p-8">
          {/* Dashboard */}
          {currentView === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Welcome back, {user.name.split(' ')[0]}!
                </h2>
                <p className="text-slate-600">Here's your content overview</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative group p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-indigo-100 rounded-xl">
                      <FileText className="text-indigo-600" size={24} />
                    </div>
                    <span className="text-3xl font-bold text-indigo-600">{stats.totalPosts}</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Total Posts</p>
                </div>

                <div className="relative group p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-pink-100 rounded-xl">
                      <BookOpen className="text-pink-600" size={24} />
                    </div>
                    <span className="text-3xl font-bold text-pink-600">{stats.totalSeries}</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Active Series</p>
                </div>

                <div className="relative group p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Eye className="text-emerald-600" size={24} />
                    </div>
                    <span className="text-3xl font-bold text-emerald-600">
                      {stats.views.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Total Views</p>
                </div>

                <div className="relative group p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-100 rounded-xl">
                      <Clock className="text-amber-600" size={24} />
                    </div>
                    <span className="text-3xl font-bold text-amber-600">{stats.drafts}</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">In Draft</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {authorPosts.slice(0, 3).map(post => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{post.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span>{post.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <Eye size={18} className="text-slate-600" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <Edit size={18} className="text-slate-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Posts View */}
          {currentView === 'posts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">All Posts</h2>
                <span className="text-sm text-slate-500">{authorPosts.length} posts</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorPosts.map(post => (
                  <div
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {post.status === 'draft' && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full">
                          DRAFT
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
                          {post.series}
                        </span>
                        <span className="text-sm text-slate-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4">{post.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye size={16} className="text-slate-400" />
                          <span className="text-sm text-slate-500">{post.views}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Edit size={18} className="text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Series View */}
          {currentView === 'series' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">Series Collection</h2>
                <span className="text-sm text-slate-500">{series.length} series</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.map(s => (
                  <div
                    key={s.id}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-40`} />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{s.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-slate-400" />
                          <span className="text-sm text-slate-500">{s.posts} articles</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Edit size={18} className="text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics & Settings (placeholder) */}
          {currentView === 'analytics' && (
            <div className="text-center py-20">
              <BarChart3 size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics Coming Soon</h3>
              <p className="text-slate-600">Track views, engagement, and growth over time.</p>
            </div>
          )}
          {currentView === 'settings' && (
            <div className="text-center py-20">
              <Settings size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Settings</h3>
              <p className="text-slate-600">Manage your profile, notifications, and preferences.</p>
            </div>
          )}
        </div>
      </main>

      {/* ---------- Create Modal ---------- */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Create {modalType === 'post' ? 'New Post' : 'New Series'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {modalType === 'post' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter a compelling title..."
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Series</label>
                    <select className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all">
                      <option>Select a series</option>
                      {series.map(s => (
                        <option key={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      placeholder="A short, engaging summary..."
                      rows={3}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
                    <div className="relative group border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-all cursor-pointer bg-slate-50">
                      <Upload className="mx-auto text-slate-400 mb-3 group-hover:text-indigo-500 transition-colors" size={40} />
                      <p className="text-slate-600 font-medium mb-1">Drop image or click to upload</p>
                      <p className="text-slate-400 text-sm">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                    <textarea
                      placeholder="Write your story..."
                      rows={10}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all font-medium"
                    >
                      Save Draft
                    </button>
                    <button className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                      Publish Post
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Series Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Design Philosophy"
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      placeholder="What is this series about?"
                      rows={4}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
                    <div className="relative group border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-all cursor-pointer bg-slate-50">
                      <Upload className="mx-auto text-slate-400 mb-3 group-hover:text-indigo-500 transition-colors" size={40} />
                      <p className="text-slate-600 font-medium mb-1">Drop image or click to upload</p>
                      <p className="text-slate-400 text-sm">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                      Create Series
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSection;