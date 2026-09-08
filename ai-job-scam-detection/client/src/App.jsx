import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">🛡️</div>
          <div>
            <strong>JobShield</strong>
            <span>AI</span>
          </div>
        </Link>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <Link to="/scan" className="nav-button">
            Scan Now
          </Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🛡️ AI-POWERED JOB SAFETY</div>

          <h1>
            Detect Fake Jobs.
            <br />
            <span>Protect Your Career.</span>
          </h1>

          <p>
            JobShield AI analyzes job vacancy details and identifies
            suspicious recruitment patterns before you apply.
          </p>

          <div className="hero-buttons">
            <Link to="/scan" className="hero-primary">
              🔍 Scan Job Notice
            </Link>

            <a href="#how-it-works" className="hero-secondary">
              How It Works →
            </a>
          </div>

          <div className="trust-line">
            ✓ Risk Scoring &nbsp;&nbsp; ✓ Scam Detection &nbsp;&nbsp;
            ✓ Explainable Results
          </div>
        </div>

        <div className="hero-visual">
          <div className="scan-card">
            <div className="scan-header">
              <div>
                <small>JOBSHIELD AI</small>
                <h3>Security Analysis</h3>
              </div>
              <div className="status-dot">●</div>
            </div>

            <div className="document-box">
              <div className="document-icon">📄</div>
              <div>
                <strong>Job Vacancy Notice</strong>
                <small>AI analysis ready</small>
              </div>
            </div>

            <div className="analysis-row">
              <span>Job Details Analysis</span>
              <b>✓</b>
            </div>

            <div className="analysis-row">
              <span>Scam Pattern Detection</span>
              <b>✓</b>
            </div>

            <div className="risk-box">
              <div>
                <small>RISK SCORE</small>
                <strong>18%</strong>
              </div>

              <div className="low-risk">LOW RISK</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-heading">
          <span>POWERFUL FEATURES</span>
          <h2>Stay Safe From Job Scams</h2>
          <p>
            Smart technology helps identify suspicious job opportunities
            before you become a victim.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Job Notice Analysis</h3>
            <p>
              Analyze job vacancy details and identify suspicious information.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Risk Detection</h3>
            <p>
              Detect suspicious recruitment patterns and calculate a scam risk
              score.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Explainable Results</h3>
            <p>
              Understand why a job vacancy has been classified as risky.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-section">
        <div className="section-heading">
          <span>SIMPLE 3-STEP PROCESS</span>
          <h2>How JobShield AI Works</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <div>
              <h3>Enter Details</h3>
              <p>
                Enter the job description, salary and contact email.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div>
              <h3>Analyze</h3>
              <p>
                The system checks the job for suspicious scam indicators.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div>
              <h3>Get Risk Score</h3>
              <p>
                Receive a risk percentage, risk level and reasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span>READY TO CHECK?</span>
          <h2>
            Don't Let a Fake Job
            <br />
            Steal Your Future.
          </h2>
        </div>

        <Link to="/scan" className="cta-button">
          Start Job Scan →
        </Link>
      </section>

      <footer>
        <div className="footer-brand">
          🛡️ <strong>JobShield AI</strong>
        </div>

        <p>AI-Based Job Scam Detection & Risk Assessment System</p>

        <span>© 2026 JobShield AI. Built for safer recruitment.</span>
      </footer>
    </div>
  );
}

function JobScanner() {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let riskScore = 0;
    const reasons = [];

    const text = jobDescription.toLowerCase();
    const email = contactEmail.toLowerCase();
    const salaryText = salary.toLowerCase();

    if (
      text.includes("registration fee") ||
      text.includes("processing fee") ||
      text.includes("pay money") ||
      text.includes("security deposit")
    ) {
      riskScore += 30;
      reasons.push("Registration or processing fee requested");
    }

    if (
      text.includes("urgent joining") ||
      text.includes("immediate joining") ||
      text.includes("join immediately")
    ) {
      riskScore += 20;
      reasons.push("Urgent joining language detected");
    }

    if (
      text.includes("no interview") ||
      text.includes("without interview")
    ) {
      riskScore += 20;
      reasons.push("Job offered without proper interview");
    }

    if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
      riskScore += 15;
      reasons.push("Personal email address used");
    }

    if (
      salaryText.includes("500000") ||
      salaryText.includes("1000000")
    ) {
      riskScore += 15;
      reasons.push("Possibly unrealistic salary detected");
    }

    if (selectedFile) {
      reasons.push("Job vacancy notice uploaded for analysis");
    }

    if (riskScore === 0) {
      riskScore = 10;
      reasons.push("No major scam indicators were detected");
    }

    if (riskScore > 100) {
      riskScore = 100;
    }

    let riskLevel = "LOW RISK";

    if (riskScore >= 60) {
      riskLevel = "HIGH RISK";
    } else if (riskScore >= 30) {
      riskLevel = "MEDIUM RISK";
    }

    const result = {
      riskScore,
      riskLevel,
      reasons,
    };

    localStorage.setItem("jobResult", JSON.stringify(result));

    navigate("/result");
  };

  return (
    <div className="scanner-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="scanner-header">
        <div className="hero-badge">AI JOB SAFETY</div>
        <h1>🔍 JobShield AI Scanner</h1>
        <p>
          Analyze a job vacancy and identify suspicious recruitment patterns.
        </p>
      </div>

      <form className="scanner-form" onSubmit={handleSubmit}>
        <label>Job Vacancy Notice</label>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <label>Job Description</label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Example: We are hiring immediately. Registration fee required..."
          required
        />

        <label>Salary</label>

        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Example: ₹50000 per month"
          required
        />

        <label>Contact Email</label>

        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="company@example.com"
          required
        />

        <button type="submit">Analyze Job →</button>
      </form>
    </div>
  );
}

function Result() {
  const navigate = useNavigate();

  const storedResult = localStorage.getItem("jobResult");
  const result = storedResult ? JSON.parse(storedResult) : null;

  if (!result) {
    return (
      <div className="result-page">
        <div className="result-card">
          <h2>No analysis result found.</h2>

          <button onClick={() => navigate("/scan")}>
            Scan a Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-icon">🛡️</div>

        <span className="result-label">JOBSHIELD AI ANALYSIS</span>

        <h1>Analysis Result</h1>

        <div className="score">
          {result.riskScore}%
        </div>

        <div
          className={`risk-level ${
            result.riskLevel === "HIGH RISK"
              ? "high"
              : result.riskLevel === "MEDIUM RISK"
              ? "medium"
              : "low"
          }`}
        >
          {result.riskLevel}
        </div>

        <div className="reasons">
          <h3>Why this result?</h3>

          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>✓ {reason}</li>
            ))}
          </ul>
        </div>

        <button onClick={() => navigate("/scan")}>
          Scan Another Job
        </button>

        <Link to="/" className="home-result-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<JobScanner />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;