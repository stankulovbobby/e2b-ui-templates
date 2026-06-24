import type { ReactNode } from 'react';
import {
  atRiskProjects,
  bottlenecks,
  executiveMetrics,
  operationsHealth,
  pipelineStages,
  regionalSnapshots,
  revenueTrend,
  teamPerformance,
  type Bottleneck,
  type ExecutiveMetric,
  type OperationsMetric,
  type PipelineStage,
  type ProjectRisk,
  type RegionalSnapshot,
  type RevenuePoint,
  type TeamPerformance
} from './mockData';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

function compactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return currency.format(value);
}

function App() {
  return (
    <main className="app-shell">
      <Header />
      <section className="hero-card" aria-labelledby="dashboard-title">
        <div className="hero-copy">
          <p className="eyebrow">SolarOps Executive Console</p>
          <h1 id="dashboard-title">Revenue momentum is strong, but permitting is now the constraint.</h1>
          <p>
            Track sales velocity, install capacity, AHJ bottlenecks, and PTO risk in one mock executive view for a high-volume solar contractor.
          </p>
        </div>
        <div className="hero-actions" aria-label="Dashboard context">
          <span>June operating review</span>
          <strong>410 active projects</strong>
        </div>
      </section>

      <section className="metric-grid" aria-label="Executive KPIs">
        {executiveMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="content-grid content-grid--primary">
        <Panel title="Signed vs. installed revenue" subtitle="Monthly trend, mock data">
          <RevenueChart data={revenueTrend} />
        </Panel>
        <Panel title="Pipeline health" subtitle="Weighted value by stage">
          <PipelineChart stages={pipelineStages} />
        </Panel>
      </section>

      <section className="content-grid content-grid--secondary">
        <Panel title="Operations health" subtitle="Where execution needs attention">
          <OperationsList metrics={operationsHealth} />
        </Panel>
        <Panel title="Regional snapshot" subtitle="Active projects, cycle time, permit pressure">
          <RegionCards regions={regionalSnapshots} />
        </Panel>
        <Panel title="Executive insights" subtitle="Plain-English callouts for this week">
          <BottleneckList items={bottlenecks} />
        </Panel>
      </section>

      <section className="content-grid content-grid--wide">
        <Panel title="At-risk projects" subtitle="Jobs that could delay revenue recognition or PTO">
          <RiskTable projects={atRiskProjects} />
        </Panel>
        <Panel title="Sales leaderboard" subtitle="Revenue, close rate, battery attachment">
          <TeamLeaderboard people={teamPerformance} />
        </Panel>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="brand-lockup" aria-label="SolarOps">
        <span className="brand-mark">S</span>
        <div>
          <strong>SolarOps</strong>
          <span>Executive Dashboard</span>
        </div>
      </div>
      <nav className="topnav" aria-label="Dashboard sections">
        <a href="#pipeline">Pipeline</a>
        <a href="#operations">Operations</a>
        <a href="#risk">Risk</a>
      </nav>
    </header>
  );
}

function MetricCard({ metric }: { metric: ExecutiveMetric }) {
  return (
    <article className={`metric-card metric-card--${metric.tone}`}>
      <div className="metric-card__header">
        <span>{metric.label}</span>
        <strong>{metric.delta}</strong>
      </div>
      <p className="metric-card__value">{metric.value}</p>
      <p className="metric-card__helper">{metric.helper}</p>
    </article>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <article className="panel">
      <div className="panel__header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const width = 620;
  const height = 260;
  const padding = 34;
  const maxValue = Math.max(...data.flatMap((point) => [point.signedRevenue, point.installedRevenue]));

  const pointsFor = (key: 'signedRevenue' | 'installedRevenue') =>
    data
      .map((point, index) => {
        const x = padding + (index * (width - padding * 2)) / (data.length - 1);
        const y = height - padding - (point[key] / maxValue) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(' ');

  return (
    <div className="chart-card">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Signed and installed revenue trend">
        <defs>
          <linearGradient id="signedGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.28)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = padding + tick * (height - padding * 2);
          return <line key={tick} className="chart-gridline" x1={padding} x2={width - padding} y1={y} y2={y} />;
        })}
        <polyline className="chart-line chart-line--signed" points={pointsFor('signedRevenue')} />
        <polyline className="chart-line chart-line--installed" points={pointsFor('installedRevenue')} />
        {data.map((point, index) => {
          const x = padding + (index * (width - padding * 2)) / (data.length - 1);
          return (
            <text key={point.month} className="chart-axis" x={x} y={height - 8} textAnchor="middle">
              {point.month}
            </text>
          );
        })}
      </svg>
      <div className="chart-legend">
        <span><i className="legend-dot legend-dot--signed" />Signed revenue</span>
        <span><i className="legend-dot legend-dot--installed" />Installed revenue</span>
      </div>
    </div>
  );
}

function PipelineChart({ stages }: { stages: PipelineStage[] }) {
  const maxValue = Math.max(...stages.map((stage) => stage.value));

  return (
    <div id="pipeline" className="pipeline-stack">
      {stages.map((stage) => (
        <div className="pipeline-row" key={stage.stage}>
          <div className="pipeline-row__label">
            <strong>{stage.stage}</strong>
            <span>{stage.deals} deals · {stage.conversion}% conversion</span>
          </div>
          <div className="pipeline-row__bar" aria-label={`${stage.stage} ${compactCurrency(stage.value)}`}>
            <span style={{ width: `${Math.max(12, (stage.value / maxValue) * 100)}%` }} />
          </div>
          <strong className="pipeline-row__value">{compactCurrency(stage.value)}</strong>
        </div>
      ))}
    </div>
  );
}

function OperationsList({ metrics }: { metrics: OperationsMetric[] }) {
  return (
    <div id="operations" className="operations-list">
      {metrics.map((metric) => (
        <article key={metric.label} className={`operation-item operation-item--${metric.status}`}>
          <div>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
          <p>{metric.detail}</p>
          <small>Target: {metric.target}</small>
        </article>
      ))}
    </div>
  );
}

function RegionCards({ regions }: { regions: RegionalSnapshot[] }) {
  return (
    <div className="region-grid">
      {regions.map((region) => (
        <article key={region.region} className="region-card">
          <div className="region-card__header">
            <strong>{region.region}</strong>
            <span>{region.activeProjects} active</span>
          </div>
          <dl>
            <div>
              <dt>Avg. cycle</dt>
              <dd>{region.avgCycleDays}d</dd>
            </div>
            <div>
              <dt>Permits</dt>
              <dd>{region.permitBacklog}</dd>
            </div>
            <div>
              <dt>PTO</dt>
              <dd>{region.ptoThisMonth}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function BottleneckList({ items }: { items: Bottleneck[] }) {
  return (
    <div className="bottleneck-list">
      {items.map((item) => (
        <article key={item.title} className={`bottleneck bottleneck--${item.severity}`}>
          <span>{item.severity}</span>
          <h3>{item.title}</h3>
          <p>{item.impact}</p>
          <strong>{item.recommendation}</strong>
        </article>
      ))}
    </div>
  );
}

function RiskTable({ projects }: { projects: ProjectRisk[] }) {
  return (
    <div id="risk" className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Homeowner</th>
            <th>Stage</th>
            <th>AHJ / Utility</th>
            <th>Age</th>
            <th>Value</th>
            <th>Risk</th>
            <th>Next action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={`${project.homeowner}-${project.stage}`}>
              <td>
                <strong>{project.homeowner}</strong>
                <span>{project.region}</span>
              </td>
              <td>{project.stage}</td>
              <td>{project.ahj}</td>
              <td>{project.ageInStageDays}d</td>
              <td>{compactCurrency(project.contractValue)}</td>
              <td><span className={`risk-pill risk-pill--${project.risk.toLowerCase()}`}>{project.risk}</span></td>
              <td>{project.nextAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TeamLeaderboard({ people }: { people: TeamPerformance[] }) {
  const maxRevenue = Math.max(...people.map((person) => person.signedRevenue));

  return (
    <div className="leaderboard">
      {people.map((person, index) => (
        <article key={person.name} className="leaderboard-row">
          <span className="leaderboard-rank">#{index + 1}</span>
          <div className="leaderboard-person">
            <strong>{person.name}</strong>
            <span>{person.role}</span>
          </div>
          <div className="leaderboard-meter" aria-label={`${person.name} signed ${compactCurrency(person.signedRevenue)}`}>
            <span style={{ width: `${(person.signedRevenue / maxRevenue) * 100}%` }} />
          </div>
          <dl>
            <div>
              <dt>Revenue</dt>
              <dd>{compactCurrency(person.signedRevenue)}</dd>
            </div>
            <div>
              <dt>Close</dt>
              <dd>{person.closeRate}%</dd>
            </div>
            <div>
              <dt>Battery</dt>
              <dd>{person.batteryAttachRate}%</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export default App;
