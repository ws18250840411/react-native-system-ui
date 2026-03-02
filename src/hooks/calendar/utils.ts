import type React from 'react'
import type { CalendarType } from '../../components/calendar/types'

export const DAY_MS = 24 * 60 * 60 * 1000
export const DEFAULT_MIN = new Date(new Date().getFullYear() - 10, 0, 1)
export const DEFAULT_MAX = new Date(new Date().getFullYear() + 10, 11, 31)

export const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
export const startOfDay = (date: Date) => { const newDate = new Date(date); newDate.setHours(0, 0, 0, 0); return newDate }
export const daysBetween = (a: Date, b: Date) => Math.round(Math.abs(startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY_MS)
export const toArrayValue = (value?: Date | Date[] | null): Date[] => !value ? [] : Array.isArray(value) ? value.filter(Boolean).map(d => new Date(d)) : [new Date(value)]
export function mapValue(value: Date[], type: CalendarType): Date | Date[] { if (type === 'single') return value[0] ?? new Date(); if (type === 'range' && value.length === 2) return value; return value }
export function normalizeValue(value: Date[], type: CalendarType) { if (type === 'single') return value.slice(0, 1); if (type === 'range') return value.slice(0, 2).sort((a, b) => a.getTime() - b.getTime()); return value }
export function formatMonth(date: Date) { return `${date.getFullYear()}/${date.getMonth() + 1}` }
export function reorderWeekdays(labels: React.ReactNode[], start: number, fallback: React.ReactNode[]) { const normalizedStart = ((start % 7) + 7) % 7; const source = labels.length === 7 ? [...labels] : fallback; return [...source.slice(normalizedStart), ...source.slice(0, normalizedStart)] }
export function buildMonth(month: Date, weekStartsOn: number): (Date | null)[] { const normalizedStart = ((weekStartsOn % 7) + 7) % 7; const firstDay = startOfMonth(month); const startOffset = (firstDay.getDay() - normalizedStart + 7) % 7; const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); const calendar: (Date | null)[] = []; for (let i = 0; i < startOffset; i += 1) calendar.push(null); for (let day = 1; day <= daysInMonth; day += 1) calendar.push(new Date(month.getFullYear(), month.getMonth(), day)); while (calendar.length < 42) calendar.push(null); return calendar }
export function getCalendarDayTestId(date: Date) { return `calendar-day-${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}` }
export function startOfMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1) }
export function clampMonth(date: Date, min: Date, max: Date) { const month = startOfMonth(date); const minMonth = startOfMonth(min); const maxMonth = startOfMonth(max); if (month.getTime() < minMonth.getTime()) return minMonth; if (month.getTime() > maxMonth.getTime()) return max; return month }
export function isSameMonth(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() }
