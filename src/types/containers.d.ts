import { RouteComponentProps } from 'react-router-dom';

// MenuMgnt.tsx, MenuSlct.tsx, OrderSheet.tsx
interface RCProps {
  table: string;
}
export type ContainerProps = RouteComponentProps<RCProps>;

// MenuMgnt.tsx, MenuSlct.tsx
export interface MenuData {
  menu_name: string;
  menu_price: number;
  menu_stock: number;
}

// MenuSlct.tsx
export interface WishData {
  menu_name: string;
  menu_price: number;
  wish_quantity: number;
}
