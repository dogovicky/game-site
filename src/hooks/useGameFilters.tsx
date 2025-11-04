import { useState } from "react";
import { API_URL } from "../lib/constants";

export type Option = {
    label: string;
    value: string;
}

export type FilterType = 'genre' | 'platform' | 'date' | 'ordering' | null;

export function useGameFilters() {
    const [genre, setGenre] = useState<Option | null>(null);
    const [platform, setPlatform] = useState<Option | null>(null);
    const [search, setSearch] = useState<string>("");
    const [dateFilter, setDateFilter] = useState<string>("");
    const [ordering, setOrdering] = useState<string>("");

    const baseUrl = API_URL;

    const url = `${baseUrl}${genre ? `&genres=${genre.value}` : ""}
        ${platform ? `&platforms=${platform.value}` : ""}
        ${search ? `&search=${search}` : ""}
        ${dateFilter ? `&dates=${dateFilter}` : ""}
        ${ordering ? `&ordering=${ordering}` : ""}
        &page_size=32`
        .replace(/\s+/g, "");

    const heading = search 
        ? `Results for "${search}"`
        : genre
        ? `${genre.label} Games`
        : platform 
        ? `Games on ${platform.label}`
        : dateFilter
        ? getDateHeading(dateFilter)
        : ordering
        ? getOrderingHeading(ordering)
        : "Popular Games";

    return { 
        heading, 
        genre, 
        platform, 
        search, 
        dateFilter,
        ordering,
        setGenre, 
        setPlatform, 
        setSearch,
        setDateFilter,
        setOrdering,
        url 
    };
}

function getDateHeading(dateFilter: string): string {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    if (dateFilter.includes('30days')) return 'Last 30 Days';
    if (dateFilter.includes('week')) return 'This Week';
    if (dateFilter.includes('nextweek')) return 'Next Week';
    return 'New Releases';
}

function getOrderingHeading(ordering: string): string {
    if (ordering === '-rating') return 'Best of the Year';
    if (ordering === '-released') return 'Popular in 2025';
    if (ordering === '-metacritic') return 'All Time Top 250';
    return 'Top Games';
}