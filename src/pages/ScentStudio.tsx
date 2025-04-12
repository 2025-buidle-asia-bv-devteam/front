import React, { useState } from 'react';
import axios from 'axios';

const ScentStudio: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [scentData, setScentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputMessage.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setScentData(null);

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message: inputMessage,
      });
      setScentData(response.data);
    } catch (err: any) {
      setError('서버 요청 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧪 Scent Studio</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="예: 스모키하고 우디한 향을 원해"
          style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '1rem' }}
        />
        <button
          onClick={handleGenerate}
          style={{
            padding: '0.5rem 1rem',
            background: '#222',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          조향
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>🔄 향 조합을 생성 중입니다...</p>}

      {scentData && (
        <div style={{ marginTop: '2rem' }}>
          <h2>✨ 향 조합 결과</h2>

          <section style={{ marginBottom: '1rem' }}>
            <h3>🔹 Top Note</h3>
            <p><strong>Name:</strong> {scentData.recipe.top_note.name}</p>
            <p><strong>Ratio:</strong> {scentData.recipe.top_note.ratio}%</p>
            <p><strong>Description:</strong> {scentData.recipe.top_note.description}</p>
          </section>

          <section style={{ marginBottom: '1rem' }}>
            <h3>🔸 Middle Note</h3>
            <p><strong>Name:</strong> {scentData.recipe.middle_note.name}</p>
            <p><strong>Ratio:</strong> {scentData.recipe.middle_note.ratio}%</p>
            <p><strong>Description:</strong> {scentData.recipe.middle_note.description}</p>
          </section>

          <section style={{ marginBottom: '1rem' }}>
            <h3>🔻 Base Note</h3>
            <p><strong>Name:</strong> {scentData.recipe.base_note.name}</p>
            <p><strong>Ratio:</strong> {scentData.recipe.base_note.ratio}%</p>
            <p><strong>Description:</strong> {scentData.recipe.base_note.description}</p>
          </section>

          <section style={{ marginBottom: '1rem' }}>
            <h3>🧬 제조 가이드</h3>
            <p><strong>Ethanol:</strong> {scentData.structured_data.manufacturing_guide.ethanol}%</p>
            <p><strong>Water:</strong> {scentData.structured_data.manufacturing_guide.water}%</p>
            <ol>
              {scentData.structured_data.manufacturing_guide.steps.map(
                (step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                )
              )}
            </ol>
          </section>

          <section>
            <h3>📝 설명</h3>
            <p>{scentData.structured_data.description}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default ScentStudio;
