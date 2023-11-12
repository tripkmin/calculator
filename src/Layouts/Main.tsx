import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main>{children}</main>;
}
