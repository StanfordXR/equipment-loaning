import { ReactNode } from 'react'

export interface ChildrenAndClassName {
    children: ReactNode;
    className?: string;
}

export interface Children {
    children: ReactNode;
}