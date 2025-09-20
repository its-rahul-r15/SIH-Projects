import React from 'react';

export default function Results(){
  const res = JSON.parse(localStorage.getItem('lastResults') || '{}');
  if(!res?.data) return <div className="p-6">No results</div>;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl mb-3">Recommendations</h2>
      <div>
        <h3>Top Streams</h3>
        <ul>{res.data.ranked_streams?.map((s,i)=><li key={i}>{s.stream} — {s.score}</li>)}</ul>
      </div>
      <div className="mt-4">
        <h3>Suggested Courses</h3>
        <ul>{res.data.suggested_courses?.map((c,i)=><li key={i}>{c.course} — {c.why}</li>)}</ul>
      </div>
      <div className="mt-4">
        <h3>Nearby Colleges</h3>
        <ul>{res.data.nearby_colleges?.map((c,i)=><li key={i}>{c.name} ({c.district})</li>)}</ul>
      </div>
    </div>
  );
}
