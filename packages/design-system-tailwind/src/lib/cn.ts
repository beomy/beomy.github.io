import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 병합 유틸리티.
 * clsx 로 조건부 클래스를 합치고 twMerge 로 충돌하는 유틸리티를 정리합니다.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
