//Типизированная обёртка над Stage
/*
import React from 'react';
import { Stage } from 'react-konva';
import type { StageConfig } from 'konva/lib/Stage';

type StageWithChildrenProps =
  Omit<StageConfig, 'container'> & {
    children?: React.ReactNode;
  };

export default function StageWithChildren(props: StageWithChildrenProps) {
  return <Stage {...(props as any)} />;
}
*/
import React from 'react';
import { Stage } from 'react-konva';

export interface StageWithChildrenProps {
  width: number;
  height: number;
  draggable?: boolean;
  scaleX?: number;
  scaleY?: number;
  x?: number;
  y?: number;
  children?: React.ReactNode;
}

export default function StageWithChildren(props: StageWithChildrenProps) {
  return <Stage {...(props as any)} />;
}