import React from 'react';
import '../styles/ScentStadium.css';

const mockData = [
  {
    rank: 1,
    name: '향마스터 A',
    address: '0x123...abcd',
    scentName: '우디 앰버 스파이스',
    image: '/images/profile1.png',
  },
  {
    rank: 2,
    name: '퍼퓸 디자이너 B',
    address: '0x456...efgh',
    scentName: '시트러스 프레쉬',
    image: '/images/profile2.png',
  },
  {
    rank: 3,
    name: '향수연금술사 C',
    address: '0x789...ijkl',
    scentName: '플로럴 무스크',
    image: '/images/profile3.png',
  },
  {
    rank: 4,
    name: '향연구가 D',
    address: '0xabc...0001',
    scentName: '그린 라이트',
  },
  {
    rank: 5,
    name: '감정가 E',
    address: '0xdef...0002',
    scentName: '다크 초콜릿 레더',
  },
];

const ScentStadium: React.FC = () => {
  const podium = mockData.slice(0, 3);
  const others = mockData.slice(3);

  return (
    <div className="stadium-container">
      <h1 className="title">🏆 Scent Stadium</h1>

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
            <th>순위</th>
            <th>제작자</th>
            <th>주소</th>
            <th>향 이름</th>
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
