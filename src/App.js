import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: #f5f0e8;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 40px 48px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 36px;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 8px;
  }

  .header-right {
    text-align: right;
  }

  .logo {
    font-family: 'DM Serif Display', serif;
    font-size: 72px;
    color: #1a1a1a;
    letter-spacing: -2px;
    line-height: 1;
  }

  .logo span { color: #e85d4a; }

  .tagline {
    font-size: 22px;
    color: #555;
    font-weight: 400;
  }

  .tagline-sub {
    font-size: 18px;
    color: #888;
    margin-top: 4px;
  }

  .stats-row {
    display: flex;
    gap: 32px;
    margin-bottom: 16px;
  }

  .stat-item { text-align: center; }

  .stat-number {
    font-family: 'DM Serif Display', serif;
    font-size: 36px;
    color: #1a1a1a;
  }

  .stat-label {
    font-size: 13px;
    color: #aaa;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .steps-row {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .step-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1a1a1a;
    color: #fff;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }

  .step-text {
    font-size: 13px;
    color: #888;
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    flex: 1;
  }
  @media (max-width: 768px) {
    .app {
      padding: 24px 16px;
    }

    .header {
      flex-direction: column;
      gap: 16px;
    }

    .header-right {
      text-align: left;
    }

    .logo {
      font-size: 48px;
    }

    .tagline {
      font-size: 18px;
    }

    .tagline-sub {
      font-size: 14px;
    }

    .columns {
      grid-template-columns: 1fr;
    }

    .stat-number {
      font-size: 28px;
    }

    .step-text {
      font-size: 13px;
    }
  }

  .panel {
    background: #fff;
    border: 1.5px solid #ebebeb;
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
  }

  .panel-label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 16px;
  }

  textarea {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 17px;
    line-height: 1.7;
    color: #1a1a1a;
    background: transparent;
    flex: 1;
    min-height: 300px;
  }

  textarea::placeholder { color: #ccc; }

  .char-count {
    font-size: 12px;
    color: #ccc;
    text-align: right;
    margin-top: 8px;
  }

  .analyze-btn {
    width: 100%;
    padding: 16px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: all 0.2s ease;
    margin-top: 16px;
  }

  .analyze-btn:hover { background: #333; transform: translateY(-1px); }
  .analyze-btn:disabled { background: #ccc; transform: none; cursor: not-allowed; }

  .empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  }

  .empty-text {
    font-size: 16px;
    color: #ccc;
    text-align: center;
    line-height: 1.6;
  }

  .result-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .score-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 20px;
    border-bottom: 1.5px solid #f0f0f0;
  }

  .score-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    flex-shrink: 0;
  }

  .score-high { background: #fff0ee; color: #e85d4a; }
  .score-mid { background: #fff8ee; color: #e8a24a; }
  .score-low { background: #eefff4; color: #4ab87a; }

  .score-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 4px;
  }

  .score-feedback {
    font-size: 15px;
    color: #1a1a1a;
    line-height: 1.5;
  }

  .section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 10px;
  }

  .phrases-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .phrase-tag {
    background: #fff0ee;
    color: #e85d4a;
    border: 1px solid #fdd;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 15px;
  }

  .rewrite-box {
    background: #f4fdf7;
    border: 1.5px solid #d4f0e0;
    border-radius: 14px;
    padding: 16px 20px;
    font-size: 17px;
    line-height: 1.7;
    color: #1a1a1a;
  }

  .copy-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background: transparent;
    border: 1.5px solid #d4f0e0;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #4ab87a;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover { background: #eefff4; }
`;

export default function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const [prevented, setPrevented] = useState(0);

  React.useEffect(() => {
    fetch('https://sendsafe-backend.onrender.com/count')
      .then(r => r.json())
      .then(data => { setCount(data.count); setPrevented(data.prevented); });
  }, [result]);

  const analyzeMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('https://sendsafe-backend.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const copyRewrite = () => {
    navigator.clipboard.writeText(result.rewrite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreClass = result
    ? result.conflict_score >= 70 ? 'score-high'
    : result.conflict_score >= 40 ? 'score-mid'
    : 'score-low'
    : '';

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        <div className="header">
          <div className="header-left">
            <div className="logo">Send<span>Safe</span></div>
            <div className="tagline">Send with confidence, not regret.</div>
            <div className="tagline-sub">Because tone doesn't travel well over text.</div>
          </div>
          <div className="header-right">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '32px' }}>
                {[[count.toString(), 'Messages Analyzed'], [prevented + '%', 'Conflict Prevented']].map(([stat, label]) => (
                  <div key={label} style={{ textAlign: 'right' }}>
                    <div className="stat-number">{stat}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[['01', 'Paste your message'], ['02', 'We analyze the tone'], ['03', 'Get a calmer rewrite']].map(([num, text]) => (
                  <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="step-text">{text}</div>
                    <div className="step-num">{num}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="panel">
            <div className="panel-label">Your Message</div>
            <textarea
              placeholder="Paste your email, text, or message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="char-count">{message.length} characters</div>
            <button
              className="analyze-btn"
              onClick={analyzeMessage}
              disabled={loading || !message.trim()}
            >
              {loading ? 'Analyzing...' : 'Analyze Message'}
            </button>
          </div>

          <div className="panel">
            <div className="panel-label">Analysis</div>
            {!result && !loading && (
              <div className="empty-state">
                <div className="empty-text">Your analysis will appear here<br />after you hit Analyze.</div>
              </div>
            )}
            {loading && (
              <div className="empty-state">
                <div className="empty-text">Analyzing your message...</div>
              </div>
            )}
            {result && (
              <div className="result-inner">
                <div className="score-row">
                  <div className={`score-circle ${scoreClass}`}>
                    {result.conflict_score}
                  </div>
                  <div>
                    <div className="score-label">Conflict Score</div>
                    <div className="score-feedback">{result.feedback}</div>
                  </div>
                </div>

                {result.aggressive_phrases && result.aggressive_phrases.length > 0 && (
                  <div>
                    <div className="section-title">Flagged Phrases</div>
                    <div className="phrases-wrap">
                      {result.aggressive_phrases.map((phrase, i) => (
                        <span key={i} className="phrase-tag">{phrase}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.rewrite && result.conflict_score >= 10 && (
                  <div>
                    <div className="section-title">Calmer Version</div>
                    <div className="rewrite-box">{result.rewrite}</div>
                    <button className="copy-btn" onClick={copyRewrite}>
                      {copied ? 'Copied!' : 'Copy rewrite'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}