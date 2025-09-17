import { JSX, ReactNode } from "react";

export interface ICardSlider {
  href?: string;
  icon?: JSX.Element;
  title?: string;
  isAll?: boolean;
}

export interface SliderCardListProps {
  children: ReactNode;
  className?: string;
  spaceBetween?: number;
  low_spacing?: boolean;
  fullCard?: boolean;
}
export interface CustomSliderProps {
  children: React.ReactNode;
  className?: string;
  spaceBetween?: number;
  fullCard?: boolean;
}
