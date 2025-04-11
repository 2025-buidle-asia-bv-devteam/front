import React, { useState } from 'react';
import '../styles/MyStudio.css';
import { internalTabs } from '../constants/myPageTabs';
import { sortOptions } from '../constants/sortOptions';

const MyStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('creations');
  const [sortOption, setSortOption] = useState<string>('latest');
  const [nickname, setNickname] = useState<string>('Unknown');
  const [profileUrl, setProfileUrl] = useState<string>('https://i.imgur.com/QCNbOAo.png');
  const [bio, setBio] = useState<string>('');

  const perfumes = [
    {
      id: 1,
      title: 'Dawn Whisper',
      likes: 12,
      date: '2024-03-01',
      price: 25,
      thumbnail: 'https://i.imgur.com/9yG0W18.png',
      isListed: false,
      isPrivate: false,
      isPurchased: false,
      isFavorite: true,
    },
    {
      id: 2,
      title: 'Velvet Mist',
      likes: 47,
      date: '2024-04-01',
      price: 18,
      thumbnail: 'https://i.imgur.com/9Zd7zTV.png',
      isListed: true,
      isPrivate: false,
      isPurchased: true,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Amber Bloom',
      likes: 22,
      date: '2024-03-25',
      price: 30,
      thumbnail: 'https://i.imgur.com/F03w0bn.png',
      isListed: false,
      isPrivate: true,
      isPurchased: true,
      isFavorite: true,
    },
    {
      id: 4,
      title: 'Midnight Fern',
      likes: 15,
      date: '2024-04-03',
      price: 22,
      thumbnail: 'https://i.imgur.com/LuO3nbh.png',
      isListed: true,
      isPrivate: false,
      isPurchased: false,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Citrus Veil',
      likes: 9,
      date: '2024-03-18',
      price: 20,
      thumbnail: 'https://i.imgur.com/WWv1FVe.png',
      isListed: false,
      isPrivate: true,
      isPurchased: true,
      isFavorite: false,
    },
  ];

  const getSortedPerfumes = () => {
    const sorted = [...perfumes];
    switch (sortOption) {
      case 'likes':
        return sorted.sort((a, b) => b.likes - a.likes);
      case 'priceLow':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return sorted.sort((a, b) => b.price - a.price);
      case 'latest':
      default:
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  };

  return (
    <div className="mystudio-container">
      <div className="studio-spacing" />
      <div className="profile-wrapper">
        <div className="profile-left">
          <img src={profileUrl} alt="Profile" className="profile-avatar" />
        </div>
        <div className="profile-right">
          <h1 className="nickname">{nickname}</h1>
          <p className="wallet">0xAb...456d</p>
          <div className="summary-cards-inline">
            <div className="summary-card"><span className="summary-label">Made</span><span className="summary-value">3</span></div>
            <div className="summary-card"><span className="summary-label">Purchased</span><span className="summary-value">5</span></div>
            <div className="summary-card"><span className="summary-label">Likes</span><span className="summary-value">47</span></div>
            <div className="summary-card highlight"><span className="summary-label">IP Value</span><span className="summary-value">1,200 ETH</span></div>
          </div>
        </div>
      </div>

      <div className="tab-menu">
        {internalTabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'creations' && (
        <>
          <div className="sort-filter">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {sortOptions.map(option => (<option key={option.key} value={option.key}>{option.label}</option>))}
            </select>
          </div>
          <div className="perfume-list">
            {getSortedPerfumes().map(item => (
              <div key={item.id} className="perfume-card">
                <img src={item.thumbnail} alt={item.title} className="perfume-thumbnail" />
                <div className="perfume-info-row"><h3 className="perfume-title">{item.title}</h3><span className="perfume-meta">{item.likes} likes · {item.price} ETH</span></div>
                <div className="perfume-actions grouped">
                  <button className="card-btn">View</button>
                  <button className="card-btn">Sell</button>
                  <button className="card-btn">Make Private</button>
                </div>
                <p className="immutable-text">Immutable: This scent is IP registered</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'onSale' && (
        <>
          <div className="sort-filter">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {sortOptions.map(option => (<option key={option.key} value={option.key}>{option.label}</option>))}
            </select>
          </div>
          <div className="perfume-list">
            {getSortedPerfumes().filter(item => item.isListed).map(item => (
              <div key={item.id} className="perfume-card">
                <img src={item.thumbnail} alt={item.title} className="perfume-thumbnail" />
                <div className="perfume-info-row"><h3 className="perfume-title">{item.title}</h3><span className="perfume-meta">{item.likes} likes · {item.price} ETH</span></div>
                <div className="perfume-actions grouped">
                  <button className="card-btn">View</button>
                  <button className="card-btn">Unlist</button>
                </div>
                <p className="immutable-text">Listed for sale</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'purchased' && (
        <>
          <div className="sort-filter">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {sortOptions.map(option => (<option key={option.key} value={option.key}>{option.label}</option>))}
            </select>
          </div>
          <div className="perfume-list">
            {getSortedPerfumes().filter(item => item.isPurchased).map(item => (
              <div key={item.id} className="perfume-card">
                <img src={item.thumbnail} alt={item.title} className="perfume-thumbnail" />
                <div className="perfume-info-row"><h3 className="perfume-title">{item.title}</h3><span className="perfume-meta">{item.price} ETH</span></div>
                <div className="perfume-actions grouped">
                  <button className="card-btn">View</button>
                </div>
                <p className="immutable-text">Purchased on {item.date}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'favorites' && (
        <>
          <div className="sort-filter">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {sortOptions.map(option => (<option key={option.key} value={option.key}>{option.label}</option>))}
            </select>
          </div>
          <div className="perfume-list">
            {getSortedPerfumes().filter(item => item.isFavorite).map(item => (
              <div key={item.id} className="perfume-card">
                <img src={item.thumbnail} alt={item.title} className="perfume-thumbnail" />
                <div className="perfume-info-row"><h3 className="perfume-title">{item.title}</h3><span className="perfume-meta">{item.likes} likes · {item.price} ETH</span></div>
                <div className="perfume-actions grouped">
                  <button className="card-btn">Buy Now</button>
                </div>
                <p className="immutable-text">❤️ You liked this scent</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Perfume</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getSortedPerfumes().filter(item => item.isPurchased || item.isListed).map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.isPurchased && item.isListed ? 'Bought & Sold' : item.isPurchased ? 'Purchased' : 'Listed'}</td>
                  <td>{item.title}</td>
                  <td>{item.price} ETH</td>
                  <td><button className="card-btn" style={{ marginLeft: '8px' }}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-form">
          <label>Nickname</label>
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your nickname" />

          <label>Profile Image URL</label>
          <input type="text" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} placeholder="Paste image URL" />

          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />

          <button className="save-btn">Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default MyStudio;