// src/components/skeletons/GameCardSkeleton.jsx (or similar path)

import React from 'react';
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton"; // Assuming this is the correct path

const GameCardSkeleton = () => {
  return (
    <Card className="overflow-hidden relative bg-card rounded-xl shadow-md">
      {/* Skeleton for Image Section */}
      <CardHeader className="p-0">
        {/* H-48 mimics the height of the actual image */}
        <Skeleton className="w-full h-48 rounded-t-xl" />
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* Skeleton for Platform Icons (a row of small circles/rects) */}
        <div className="flex items-center gap-2">
          {/* Five placeholder icons */}
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>

        {/* Skeleton for Title (two lines) */}
        <div className="space-y-2">
          <Skeleton className="w-11/12 h-6" /> 
          <Skeleton className="w-3/4 h-6" />
        </div>

        <div className="flex items-center justify-between text-sm">
          {/* Skeleton for Rating */}
          <div className="flex items-center gap-1">
            <Skeleton className="w-10 h-4 rounded-full" />
          </div>

          {/* Skeleton for Release Date */}
          <div className="flex items-center gap-1">
            <Skeleton className="w-16 h-4 rounded-full" />
          </div>
        </div>

        {/* Skeleton for Genres (Optional) */}
        <div className="flex flex-wrap gap-1">
          <Skeleton className="w-12 h-5 rounded-full" />
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCardSkeleton;