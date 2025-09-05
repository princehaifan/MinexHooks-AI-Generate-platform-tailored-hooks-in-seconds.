import type { GROUPED_CONTENT_TYPES } from './constants';

export type ContentType = typeof GROUPED_CONTENT_TYPES[number]['types'][number];

export interface Hook {
  text: string;
  emoji: string;
}

export interface HookCategory {
  category: string;
  hooks: Hook[];
}

export type ModalType = 'login' | 'credits' | null;

export interface ModalInfo {
    type: ModalType;
    data: {
        current: number;
        required: number;
    } | null;
}
