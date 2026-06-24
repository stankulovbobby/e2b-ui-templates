import type { ReactNode } from 'react';
import {
  ahjBenchmarks,
  analyticsMetrics,
  bottleneckInsights,
  cycleTimeDistribution,
  cycleTrend,
  permitAgingDistribution,
  projectSamples,
  regionalCohorts,
  stageAging,
  type AhjBenchmark,
  type AnalyticsMetric,
  type BottleneckInsight,
  type CycleTrendPoint,
  type DistributionBucket,
  type ProjectSample,
  type RegionalCohort,
  type StageAgingDistribution
} from './mockData';

const max = (values: number[]) => Math.max(...values, 1);

function App() {
  return (
    <main className="app-shell">
      <Header />

      <section className="hero-card" aria-labelledby="workbench-title">
        <div className="hero-copy">
          <p className="eyebrow">Solar Analytics Workbench</p>
          <h1 id="workbench-title">Find the stage delays hiding inside your solar project pipeline.</h1>
          <p>
            Analyze cycle time, AHJ permitting variance, inspection rework, and PTO aging with mock operational data built for solar contractor leaders.
          </p>
        </div>
        <div className="filter-console" aria-label="Analytics filters">
          <span>Last 90 days</span>
          <strong>286 project sample</strong>
          <div className="filter-pills">
            <span>Region: All</span>
            <span>Utility: All</span>
            <span>Stage: Active</span>
          </div>
        </div>
      </section>

      <section className="metric-grid" aria-label="Analytics KPI summary">
        {analyticsMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="content-grid content-grid--primary">
        <Panel title="Cycle-time distribution" subtitle="Signed contract to PTO, bucketed by project age">
          <Histogram data={cycleTimeDistribution} color="blue" />
        </Panel>
        <Panel title="Permit aging distribution" subtitle="Active jobs in AHJ review">
          <Histogram data={permitAgingDistribution} color="amber" />
        </Panel>
      </section>

      <section className="content-grid content-grid--analysis">
        <Panel title="Cycle-time trend" subtitle="Median days by month and project phase">
          <TrendChart data={cycleTrend} />
        </Panel>
        <Panel title="Stage aging benchmark" subtitle="Median and P90 days by active stage">
          <StageAgingChart stages={stageAging} />
        </Panel>
        <Panel title="Regional cohorts" subtitle="Compare operating health by region">
          <RegionalCohorts cohorts={regionalCohorts} />
        </Panel>
      </section>

      <section className="content-grid content-grid--bottom">
        <Panel title="AHJ benchmark table" subtitle="Where permit review needs attention">
          <AhjTable rows={ahjBenchmarks} />
        </Panel>
        <Panel title="Bottleneck insights" subtitle="Plain-English interpretation for operators">
          <InsightList insights={bottleneckInsights} />
        </Panel>
      </section>

      <section className="content-grid content-grid--wide">
        <Panel title="Project drill-down" subtitle="Sample projects driving the current distributions">
          <ProjectTable projects={projectSamples} />
        </Panel>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="brand-lockup" aria-label="Solar Analytics">
        <span className="brand-mark">A</span>
        <div>
          <strong>SolarAnalytics</strong>
          <span>Operations Workbench</span>
        </div>
      </div>
      <nav className="topnav" aria-label="Analytics sections">
        <a href="#cycle">Cycle Time</a>
        <a href="#permit">Permitting</a>
        <a href="#pto">PTO Risk</a>
      </nav>
    </header>
  );
}

function MetricCard({ metric }: { metric: AnalyticsMetric }) {
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
    <section className="panel">
      <div className="panel__header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button type="button" aria-label={`More options for ${title}`}>•••</button>
      </div>
      {children}
    </section>
  );
}

function Histogram({ data, color }: { data: DistributionBucket[]; color: 'blue' | 'amber' }) {
  const highest = max(data.map((bucket) => Math.max(bucket.count, bucket.benchmark ?? 0)));
  return (
    <div className="histogram" role="img" aria-label="Distribution histogram">
      <div className="histogram__plot">
        {data.map((bucket) => {
          const valueHeight = Math.round((bucket.count / highest) * 100);
          const benchmarkHeight = Math.round(((bucket.benchmark ?? 0) / highest) * 100);
          return (
            <div className="histogram__bar-group" key={bucket.bucket}>
              <div className="histogram__bars">
                <span className={`histogram__bar histogram__bar--${color}`} style={{ height: `${valueHeight}%` }} />
                <span className="histogram__benchmark" style={{ height: `${benchmarkHeight}%` }} />
              </div>
              <strong>{bucket.count}</strong>
              <span>{bucket.bucket}</span>
            </div>
          );
        })}
      </div>
      <div className="histogram__legend">
        <span><i className={`legend-dot legend-dot--${color}`} /> Current cohort</span>
        <span><i className="legend-dot legend-dot--benchmark" /> Target benchmark</span>
      </div>
      <p className="histogram__note">The tail of the distribution is the operating risk. Focus on buckets to the right of target, not just the average.</p>
    </div>
  );
}

function TrendChart({ data }: { data: CycleTrendPoint[] }) {
  const width = 620;
  const height = 260;
  const padding = 34;
  const highest = max(data.flatMap((point) => [point.signedToInstall, point.installToPto, point.permitAging]));
  const x = (index: number) => padding + (index * (width - padding * 2)) / (data.length - 1);
  const y = (value: number) => height - padding - (value / highest) * (height - padding * 2);
  const pointsFor = (key: keyof Pick<CycleTrendPoint, 'signedToInstall' | 'installToPto' | 'permitAging'>) =>
    data.map((point, index) => `${x(index)},${y(point[key])}`).join(' ');

  return (
    <div className="trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cycle time trend line chart">
        {[0, 1, 2, 3].map((line) => {
          const yPos = padding + line * ((height - padding * 2) / 3);
          return <line key={line} x1={padding} x2={width - padding} y1={yPos} y2={yPos} className="grid-line" />;
        })}
        <polyline points={pointsFor('signedToInstall')} className="trend-line trend-line--blue" />
        <polyline points={pointsFor('permitAging')} className="trend-line trend-line--amber" />
        <polyline points={pointsFor('installToPto')} className="trend-line trend-line--green" />
        {data.map((point, index) => (
          <g key={point.month}>
            <circle cx={x(index)} cy={y(point.signedToInstall)} r="4" className="dot dot--blue" />
            <circle cx={x(index)} cy={y(point.permitAging)} r="4" className="dot dot--amber" />
            <circle cx={x(index)} cy={y(point.installToPto)} r="4" className="dot dot--green" />
            <text x={x(index)} y={height - 8} textAnchor="middle" className="axis-label">{point.month}</text>
          </g>
        ))}
      </svg>
      <div className="chart-legend">
        <span><i className="legend-dot legend-dot--blue" /> Signed to install</span>
        <span><i className="legend-dot legend-dot--amber" /> Permit aging</span>
        <span><i className="legend-dot legend-dot--green" /> Install to PTO</span>
      </div>
    </div>
  );
}

function StageAgingChart({ stages }: { stages: StageAgingDistribution[] }) {
  const highest = max(stages.map((stage) => stage.p90Days));
  return (
    <div className="stage-aging">
      {stages.map((stage) => (
        <div className="stage-row" key={stage.stage}>
          <div>
            <strong>{stage.stage}</strong>
            <span>{stage.activeProjects} active projects</span>
          </div>
          <div className="stage-bars" aria-label={`${stage.stage} median ${stage.medianDays} days, P90 ${stage.p90Days} days`}>
            <span className="stage-bars__p90" style={{ width: `${(stage.p90Days / highest) * 100}%` }} />
            <span className={`stage-bars__median stage-bars__median--${stage.riskLevel}`} style={{ width: `${(stage.medianDays / highest) * 100}%` }} />
          </div>
          <div className="stage-row__numbers">
            <span>{stage.medianDays}d median</span>
            <strong>{stage.p90Days}d P90</strong>
          </div>
        </div>
      ))}
      <div className="chart-legend">
        <span><i className="legend-dot legend-dot--p90" /> P90</span>
        <span><i className="legend-dot legend-dot--blue" /> Median</span>
      </div>
    </div>
  );
}

function RegionalCohorts({ cohorts }: { cohorts: RegionalCohort[] }) {
  return (
    <div className="region-grid">
      {cohorts.map((cohort) => (
        <article className="region-card" key={cohort.region}>
          <div className="region-card__top">
            <strong>{cohort.region}</strong>
            <span>{cohort.sampleSize} jobs</span>
          </div>
          <dl>
            <div>
              <dt>Median cycle</dt>
              <dd>{cohort.medianCycleDays}d</dd>
            </div>
            <div>
              <dt>PTO conversion</dt>
              <dd>{cohort.ptoConversion}%</dd>
            </div>
          </dl>
          <p>{cohort.blocker}</p>
        </article>
      ))}
    </div>
  );
}

function AhjTable({ rows }: { rows: AhjBenchmark[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>AHJ</th>
            <th>Region</th>
            <th>Avg permit</th>
            <th>P90</th>
            <th>Open jobs</th>
            <th>Resubmits</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.ahj}>
              <td>{row.ahj}</td>
              <td>{row.region}</td>
              <td>{row.avgPermitDays}d</td>
              <td>{row.p90PermitDays}d</td>
              <td>{row.openProjects}</td>
              <td>{row.resubmissionRate}%</td>
              <td><span className={`status status--${row.status.toLowerCase()}`}>{row.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InsightList({ insights }: { insights: BottleneckInsight[] }) {
  return (
    <div className="insight-list">
      {insights.map((insight) => (
        <article className={`insight insight--${insight.severity}`} key={insight.title}>
          <div>
            <span>{insight.severity}</span>
            <strong>{insight.metric}</strong>
          </div>
          <h3>{insight.title}</h3>
          <p>{insight.explanation}</p>
          <em>{insight.recommendation}</em>
        </article>
      ))}
    </div>
  );
}

function ProjectTable({ projects }: { projects: ProjectSample[] }) {
  return (
    <div className="table-wrap table-wrap--wide">
      <table>
        <thead>
          <tr>
            <th>Homeowner</th>
            <th>Stage</th>
            <th>Region</th>
            <th>Utility</th>
            <th>AHJ</th>
            <th>Age</th>
            <th>Total cycle</th>
            <th>Crew</th>
            <th>Risk</th>
            <th>Next action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.homeowner}>
              <td>{project.homeowner}</td>
              <td>{project.stage}</td>
              <td>{project.region}</td>
              <td>{project.utility}</td>
              <td>{project.ahj}</td>
              <td>{project.ageInStageDays}d</td>
              <td>{project.totalCycleDays}d</td>
              <td>{project.crew}</td>
              <td><span className={`risk risk--${project.risk.toLowerCase()}`}>{project.risk}</span></td>
              <td>{project.nextAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
