export type MetricTone = 'positive' | 'watch' | 'risk' | 'neutral';

export type AnalyticsMetric = {
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
  helper: string;
};

export type DistributionBucket = {
  bucket: string;
  count: number;
  benchmark?: number;
  description: string;
};

export type StageAgingDistribution = {
  stage: string;
  medianDays: number;
  p90Days: number;
  activeProjects: number;
  riskLevel: 'low' | 'medium' | 'high';
};

export type CycleTrendPoint = {
  month: string;
  signedToInstall: number;
  installToPto: number;
  permitAging: number;
};

export type AhjBenchmark = {
  ahj: string;
  region: string;
  avgPermitDays: number;
  p90PermitDays: number;
  openProjects: number;
  resubmissionRate: number;
  status: 'Ahead' | 'Watch' | 'Escalate';
};

export type ProjectSample = {
  homeowner: string;
  stage: string;
  region: string;
  utility: string;
  ahj: string;
  ageInStageDays: number;
  totalCycleDays: number;
  crew: string;
  nextAction: string;
  risk: 'High' | 'Medium' | 'Low';
};

export type BottleneckInsight = {
  title: string;
  metric: string;
  severity: 'high' | 'medium' | 'low';
  explanation: string;
  recommendation: string;
};

export type RegionalCohort = {
  region: string;
  sampleSize: number;
  medianCycleDays: number;
  ptoConversion: number;
  blocker: string;
};

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    label: 'Median cycle time',
    value: '39 days',
    delta: '-4 days vs. Q1',
    tone: 'positive',
    helper: 'Signed contract to PTO across completed projects.'
  },
  {
    label: 'Permit aging P90',
    value: '31 days',
    delta: '+6 days in Bay Area',
    tone: 'watch',
    helper: '90th percentile for active jobs in permit review.'
  },
  {
    label: 'Install-to-PTO gap',
    value: '13 days',
    delta: '+3 days this month',
    tone: 'risk',
    helper: 'Utility interconnection follow-up is creating revenue lag.'
  },
  {
    label: 'Sample projects',
    value: '286',
    delta: 'Last 90 days',
    tone: 'neutral',
    helper: 'Mock project cohort filtered by active residential solar jobs.'
  }
];

export const cycleTimeDistribution: DistributionBucket[] = [
  { bucket: '0–20d', count: 18, benchmark: 22, description: 'Fast-track projects with clean site survey and instant permit approval.' },
  { bucket: '21–30d', count: 44, benchmark: 52, description: 'Healthy delivery window for standard residential installs.' },
  { bucket: '31–40d', count: 63, benchmark: 54, description: 'Most projects land here when permitting remains on plan.' },
  { bucket: '41–50d', count: 47, benchmark: 34, description: 'Projects need coordinator review before they age into risk.' },
  { bucket: '51–70d', count: 29, benchmark: 18, description: 'Delayed by AHJ comments, inspection rework, or utility queues.' },
  { bucket: '70d+', count: 14, benchmark: 7, description: 'Executive escalation cohort with missed revenue timing.' }
];

export const permitAgingDistribution: DistributionBucket[] = [
  { bucket: '0–7d', count: 32, benchmark: 35, description: 'New permit submissions still within normal review window.' },
  { bucket: '8–14d', count: 46, benchmark: 42, description: 'Expected queue for moderate-volume AHJs.' },
  { bucket: '15–21d', count: 38, benchmark: 28, description: 'Watch list for incomplete plan checks or AHJ capacity.' },
  { bucket: '22–30d', count: 27, benchmark: 16, description: 'Likely needs coordinator follow-up.' },
  { bucket: '31–45d', count: 15, benchmark: 9, description: 'Escalation candidate for plan check comments.' },
  { bucket: '45d+', count: 9, benchmark: 4, description: 'High-risk aging that can push install commitments.' }
];

export const stageAging: StageAgingDistribution[] = [
  { stage: 'Site Survey', medianDays: 4, p90Days: 9, activeProjects: 38, riskLevel: 'low' },
  { stage: 'Design', medianDays: 6, p90Days: 14, activeProjects: 46, riskLevel: 'low' },
  { stage: 'Permit Submitted', medianDays: 18, p90Days: 37, activeProjects: 61, riskLevel: 'high' },
  { stage: 'Scheduled', medianDays: 7, p90Days: 18, activeProjects: 42, riskLevel: 'medium' },
  { stage: 'Inspection', medianDays: 8, p90Days: 21, activeProjects: 27, riskLevel: 'medium' },
  { stage: 'PTO', medianDays: 13, p90Days: 29, activeProjects: 34, riskLevel: 'high' }
];

export const cycleTrend: CycleTrendPoint[] = [
  { month: 'Jan', signedToInstall: 29, installToPto: 11, permitAging: 19 },
  { month: 'Feb', signedToInstall: 31, installToPto: 12, permitAging: 21 },
  { month: 'Mar', signedToInstall: 34, installToPto: 11, permitAging: 23 },
  { month: 'Apr', signedToInstall: 36, installToPto: 13, permitAging: 27 },
  { month: 'May', signedToInstall: 38, installToPto: 14, permitAging: 30 },
  { month: 'Jun', signedToInstall: 39, installToPto: 13, permitAging: 31 }
];

export const ahjBenchmarks: AhjBenchmark[] = [
  { ahj: 'San Jose Building Dept.', region: 'Bay Area', avgPermitDays: 26, p90PermitDays: 44, openProjects: 18, resubmissionRate: 17, status: 'Escalate' },
  { ahj: 'Riverside County', region: 'Inland Empire', avgPermitDays: 21, p90PermitDays: 36, openProjects: 16, resubmissionRate: 11, status: 'Watch' },
  { ahj: 'Fresno County', region: 'Central Valley', avgPermitDays: 14, p90PermitDays: 25, openProjects: 12, resubmissionRate: 8, status: 'Ahead' },
  { ahj: 'Alameda County', region: 'Bay Area', avgPermitDays: 23, p90PermitDays: 39, openProjects: 15, resubmissionRate: 14, status: 'Watch' },
  { ahj: 'San Diego County', region: 'Southern CA', avgPermitDays: 18, p90PermitDays: 31, openProjects: 13, resubmissionRate: 10, status: 'Watch' }
];

export const projectSamples: ProjectSample[] = [
  {
    homeowner: 'Garcia Residence',
    stage: 'Permit Submitted',
    region: 'Inland Empire',
    utility: 'SCE',
    ahj: 'Riverside County',
    ageInStageDays: 32,
    totalCycleDays: 47,
    crew: 'Crew Vega',
    nextAction: 'Escalate plan check notes with AHJ coordinator.',
    risk: 'High'
  },
  {
    homeowner: 'Patel Residence',
    stage: 'Permit Submitted',
    region: 'Central Valley',
    utility: 'PG&E',
    ahj: 'Fresno County',
    ageInStageDays: 28,
    totalCycleDays: 44,
    crew: 'Crew Solano',
    nextAction: 'Submit missing single-line diagram revision.',
    risk: 'High'
  },
  {
    homeowner: 'Johnson Residence',
    stage: 'Inspection',
    region: 'Bay Area',
    utility: 'PG&E',
    ahj: 'Alameda County',
    ageInStageDays: 21,
    totalCycleDays: 52,
    crew: 'Crew Reyes',
    nextAction: 'Schedule re-inspection after breaker label correction.',
    risk: 'Medium'
  },
  {
    homeowner: 'Martinez Residence',
    stage: 'PTO',
    region: 'Southern CA',
    utility: 'SDG&E',
    ahj: 'San Diego County',
    ageInStageDays: 17,
    totalCycleDays: 61,
    crew: 'Crew Ibarra',
    nextAction: 'Follow up on utility interconnection packet.',
    risk: 'Medium'
  },
  {
    homeowner: 'Lee Residence',
    stage: 'Scheduled',
    region: 'Bay Area',
    utility: 'PG&E',
    ahj: 'San Jose Building Dept.',
    ageInStageDays: 9,
    totalCycleDays: 36,
    crew: 'Crew Navarro',
    nextAction: 'Confirm battery inventory before install window.',
    risk: 'Low'
  }
];

export const bottleneckInsights: BottleneckInsight[] = [
  {
    title: 'Bay Area permit aging is widening the tail',
    metric: 'P90 permit aging: 44 days',
    severity: 'high',
    explanation: 'A small set of AHJs is creating most projects over the 45-day cycle-time threshold.',
    recommendation: 'Prioritize plan-check escalation for San Jose and Alameda before scheduling additional installs.'
  },
  {
    title: 'PTO lag is now the second-largest revenue delay',
    metric: 'Install-to-PTO gap: 13 days',
    severity: 'medium',
    explanation: 'Utility interconnection follow-up is slowing recognition even after field work is complete.',
    recommendation: 'Create a daily PTO aging queue for jobs older than 10 days after inspection approval.'
  },
  {
    title: 'Central Valley is the cleanest operating cohort',
    metric: 'Median cycle time: 33 days',
    severity: 'low',
    explanation: 'Lower resubmission rate and faster AHJ turnaround keep the region inside target cycle time.',
    recommendation: 'Reuse Central Valley document checklist for slower AHJs.'
  }
];

export const regionalCohorts: RegionalCohort[] = [
  { region: 'Bay Area', sampleSize: 82, medianCycleDays: 45, ptoConversion: 71, blocker: 'Permit review tail' },
  { region: 'Central Valley', sampleSize: 61, medianCycleDays: 33, ptoConversion: 84, blocker: 'Crew scheduling' },
  { region: 'Inland Empire', sampleSize: 74, medianCycleDays: 41, ptoConversion: 76, blocker: 'Inspection rework' },
  { region: 'Southern CA', sampleSize: 69, medianCycleDays: 43, ptoConversion: 73, blocker: 'Utility interconnection' }
];
