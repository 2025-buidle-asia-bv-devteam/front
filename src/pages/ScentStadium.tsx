import React from 'react';
import '../styles/ScentStadium.css';

const mockData = [
  {
    rank: 1,
    name: 'Scent Master',
    address: '0x123...abcd',
    scentName: 'Woody amber spice',
    image: '/amber_whisper.png',
  },
  {
    rank: 2,
    name: 'Perfume designer',
    address: '0x456...efgh',
    scentName: 'Citrus Fresh',
    image: '/ocean_breeze.png',
  },
  {
    rank: 3,
    name: 'Perfume alchemist',
    address: '0x789...ijkl',
    scentName: 'Floral Musk',
    image: '/velvet_rose.png',
  },
  {
    rank: 4,
    name: 'Scent researcher',
    address: '0xabc...0001',
    scentName: 'Green Light',
  },
  {
    rank: 5,
    name: 'Ancient Whale',
    address: '0xdef...0002',
    scentName: 'Dark choco ladder',
  },
  {
    rank: 6,
    name: 'TOP Maxim',
    address: '0xawx...0005',
    scentName: 'Hack Purple',
  },
  {
    rank: 7,
    name: 'Buring Bowl',
    address: '0xdpe...0012',
    scentName: 'Ice Gaknok',
  },
];

const ScentStadium: React.FC = () => {
  const podium = mockData.slice(0, 3);
  const others = mockData.slice(3);

  return (
    <div className="stadium-container">
      <h1 className="stadium-title">🏆 Scent Stadium</h1>

      <div className="podium">
        {podium.map((item) => (
          <div key={item.rank} className={`podium-slot rank-${item.rank}`}>
            <div className="profile-img-container">
              <img src={item.image} alt={item.name} className="profile-img" />
              <div className="creator-name">{item.name}</div>
            </div>
            <div className="step-box">{item.rank}</div>
          </div>
        ))}
      </div>

      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>owner</th>
            <th>address</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {others.map((item) => (
            <tr key={item.rank}>
              <td>{item.rank}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.scentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScentStadium;
