import React from "react"
import { SavedSearchQuery } from "../models/searchQuery"

interface Props {
  savedQueries: SavedSearchQuery[]
  selectQuery: (savedQuery: SavedSearchQuery) => void
}

const RecentSearches = ({ savedQueries, selectQuery }: Props) => {
  return (
    <div className="m-recent-searches">
      <div className="m-recent-searches__heading">Recent Searches</div>
      {savedQueries.map((savedQuery, i) => (
        <button
          key={i}
          className="m-recent-searches__button"
          onClick={() => selectQuery(savedQuery)}
        >
          {savedQuery.text}
        </button>
      ))}
    </div>
  )
}

export default RecentSearches
