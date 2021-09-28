import { RouteComponentProps } from 'react-router-dom';

// Payment.tsx
interface RCProps {
  table: string;
}
export type PaymentProps = RouteComponentProps<RCProps>;

// TableMgnt.tsx
export interface TableMgntProps {
  isOpen: boolean;
}
