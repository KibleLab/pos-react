// MenuButton.tsx
export interface MenuButtonProps {
  onClick: () => void;
  name: string;
  index: number;
  stock: number;
  price: number;
}

// WishButton.tsx
export interface WishButtonProps {
  index: number;
  name: string;
  price: number;
  quantity: number;
  delete: () => void;
  plus: () => void;
  minus: () => void;
}

// TableButton.tsx
export interface TableButtonProps {
  index: number;
  table: string;
  title: string;
}

// TableButton.tsx
export interface OrderProps {
  index: number;
  name: string;
  quantity: number;
}
