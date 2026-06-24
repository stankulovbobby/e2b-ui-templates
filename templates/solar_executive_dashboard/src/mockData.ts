export type MetricTone = 'positive' | 'warning' | 'neutral';

export type ExecutiveMetric = {
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
  helper: string;
};

export type PipelineStage = {
  stage: string;
  value: number;
  deals: number;
  conversion: number;
};

export type RevenuePoint = {
  month: string;
  signedRevenue: number;
  installedRevenue: number;
};

export type OperationsMetric = {
  label: string;
  value: string;
  target: string;
  status: 'healthy' | 'watch' | 'blocked';
  detail: string;
};

export type ProjectRisk = {
  homeowner: string;
  stage: string;
  region: string;
  ahj: string;
  ageInStageDays: number;
  contractValue: number;
  risk: 'High' | 'Medium' | 'Low';
  nextAction: string;
};

export type TeamPerformance = {
  name: string;
  role: string;
  signedRevenue: number;
  closeRate: number;
  batteryAttachRate: number;
};

export type RegionalSnapshot = {
  region: string;
  activeProjects: number;
  avgCycleDays: number;
  permitBacklog: number;
  ptoThisMonth: number;
};

export type Bottleneck = {
  title: string;
  impact: string;
  recommendation: string;
  severity: 'high' | 'medium' | 'low';
};

export const executiveMetrics: ExecutiveMetric[] = [
  {
    label: 'Signed revenue',
    value: '$4.82M',
    delta: '+18% MoM',
    tone: 'positive',
    helper: 'Contracts signed across residential solar and battery add-ons.'
  },
  {
    label: 'Pipeline value',
    value: '$11.4M',
    delta: '+7% vs target',
    tone: 'positive',
    helper: 'Weighted proposal and financing pipeline for the next 60 days.'
  },
  {
    label: 'Avg. cycle time',
    value: '42 days',
    delta: '-5 days',
    tone: 'positive',
    helper: 'Signed contract to PTO across completed projects this quarter.'
  },
  {
    label: 'At-risk projects',
    value: '23',
    delta: '+6 this week',
    tone: 'warning',
    helper: 'Jobs aging in permitting, inspection, or utility interconnection.'
  }
];

export const pipelineStages: PipelineStage[] = [
  { stage: 'New Lead', value: 1850000, deals: 74, conversion: 100 },
  { stage: 'Qualified', value: 1520000, deals: 48, conversion: 65 },
  { stage: 'Proposal', value: 2480000, deals: 39, conversion: 53 },
  { stage: 'Financing', value: 1760000, deals: 26, conversion: 35 },
  { stage: 'Signed', value: 3820000, deals: 42, conversion: 57 }
];

export const revenueTrend: RevenuePoint[] = [
  { month: 'Jan', signedRevenue: 2900000, installedRevenue: 2100000 },
  { month: 'Feb', signedRevenue: 3150000, installedRevenue: 2350000 },
  { month: 'Mar', signedRevenue: 3420000, installedRevenue: 2680000 },
  { month: 'Apr', signedRevenue: 3880000, installedRevenue: 2940000 },
  { month: 'May', signedRevenue: 4210000, installedRevenue: 3270000 },
  { month: 'Jun', signedRevenue: 4820000, installedRevenue: 3510000 }
];

export const operationsHealth: OperationsMetric[] = [
  {
    label: 'Permit backlog',
    value: '61 jobs',
    target: '< 50',
    status: 'watch',
    detail: 'Largest drag is two AHJs in the Bay Area region.'
  },
  {
    label: 'Crew utilization',
    value: '87%',
    target: '82–90%',
    status: 'healthy',
    detail: 'Enough capacity for signed volume if permits clear on schedule.'
  },
  {
    label: 'Inspection pass rate',
    value: '94%',
    target: '> 92%',
    status: 'healthy',
    detail: 'Field quality improved after checklist update.'
  },
  {
    label: 'PTO aging',
    value: '14 jobs',
    target: '< 10',
    status: 'blocked',
    detail: 'Utility interconnection follow-up needs executive attention.'
  }
];

export const atRiskProjects: ProjectRisk[] = [
  {
    homeowner: 'Maya Bennett',
    stage: 'Permit Submitted',
    region: 'Bay Area',
    ahj: 'San Jose Building Dept.',
    ageInStageDays: 18,
    contractValue: 68500,
    risk: 'High',
    nextAction: 'Escalate permit packet review with AHJ coordinator.'
  },
  {
    homeowner: 'Daniel Cho',
    stage: 'Inspection',
    region: 'Central Valley',
    ahj: 'Fresno County',
    ageInStageDays: 9,
    contractValue: 51900,
    risk: 'Medium',
    nextAction: 'Confirm crew uploaded corrected roof photos.'
  },
  {
    homeowner: 'Priya Raman',
    stage: 'PTO',
    region: 'South Bay',
    ahj: 'PG&E Territory',
    ageInStageDays: 21,
    contractValue: 74200,
    risk: 'High',
    nextAction: 'Utility escalation queue; missing interconnection approval.'
  },
  {
    homeowner: 'Luis Ortega',
    stage: 'Design',
    region: 'Sacramento',
    ahj: 'Sacramento County',
    ageInStageDays: 7,
    contractValue: 43200,
    risk: 'Low',
    nextAction: 'Review MPU adder before sending revised proposal.'
  }
];

export const teamPerformance: TeamPerformance[] = [
  {
    name: 'Ari Cole',
    role: 'Senior Solar Consultant',
    signedRevenue: 865000,
    closeRate: 34,
    batteryAttachRate: 41
  },
  {
    name: 'Jenna Park',
    role: 'Regional Sales Lead',
    signedRevenue: 742000,
    closeRate: 31,
    batteryAttachRate: 36
  },
  {
    name: 'Marco Silva',
    role: 'Solar Consultant',
    signedRevenue: 688000,
    closeRate: 29,
    batteryAttachRate: 33
  },
  {
    name: 'Nora Williams',
    role: 'Partner Channel Manager',
    signedRevenue: 612000,
    closeRate: 27,
    batteryAttachRate: 28
  }
];

export const regionalSnapshots: RegionalSnapshot[] = [
  { region: 'Bay Area', activeProjects: 142, avgCycleDays: 47, permitBacklog: 26, ptoThisMonth: 18 },
  { region: 'Sacramento', activeProjects: 88, avgCycleDays: 39, permitBacklog: 14, ptoThisMonth: 21 },
  { region: 'Central Valley', activeProjects: 76, avgCycleDays: 36, permitBacklog: 9, ptoThisMonth: 17 },
  { region: 'South Bay', activeProjects: 104, avgCycleDays: 44, permitBacklog: 12, ptoThisMonth: 13 }
];

export const bottlenecks: Bottleneck[] = [
  {
    title: 'Permitting velocity slipped in Bay Area',
    impact: 'Adds an estimated $410K of signed revenue risk over the next 30 days.',
    recommendation: 'Shift one coordinator to San Jose and prioritize packets older than 14 days.',
    severity: 'high'
  },
  {
    title: 'Battery attach rate is rising',
    impact: 'Adds margin upside but increases design-review complexity.',
    recommendation: 'Create a fast-lane design checklist for battery + MPU combinations.',
    severity: 'medium'
  },
  {
    title: 'Inspection pass rate recovered',
    impact: 'Reduces truck rolls and improves PTO predictability.',
    recommendation: 'Keep the updated field checklist mandatory for every crew.',
    severity: 'low'
  }
];
