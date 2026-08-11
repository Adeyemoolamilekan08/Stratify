export interface Report {
  id: string;
  title: string;
  type: 'production' | 'downtime' | 'quality' | 'performance' | 'oee';
  dateRange: {
    start: Date;
    end: Date;
  };
  data: any;
  createdAt: Date;
}
