# useSearchParamsManager Hook

A custom React hook for managing URL search parameters in filter components. This hook provides a centralized way to handle search parameters, filters, and pagination state.

## Features

- **Automatic URL synchronization**: Changes to filters and pagination are automatically reflected in the URL
- **Filter management**: Easy handling of complex filter objects
- **Pagination support**: Built-in current page state management
- **Browser history**: Works with browser back/forward navigation
- **Clean URLs**: Removes empty/default parameters from the URL

## Usage

### Basic Usage

```tsx
import { useSearchParamsManager } from "@/lib/hooks/useSearchParamsManager";

function MyComponent() {
  const { filters, currentPage, updateFilters, updatePage } =
    useSearchParamsManager();

  // Use in your component...
}
```

### With Filters Component

```tsx
function MoviesPage() {
  const { filters, updateFilters, currentPage, updatePage } =
    useSearchParamsManager();

  return (
    <>
      <Filters initialFilters={filters} setFilters={updateFilters} />

      <SearchPagination
        setCurrentPage={updatePage}
        pages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
}
```

## API Reference

### Return Values

| Property             | Type                                                 | Description                           |
| -------------------- | ---------------------------------------------------- | ------------------------------------- |
| `filters`            | `FilterParams`                                       | Current filter state object           |
| `currentPage`        | `number`                                             | Current page number (1-based)         |
| `searchParams`       | `URLSearchParams`                                    | Raw search params object              |
| `updateFilters`      | `(filters: FilterParams) => void`                    | Update filters and sync to URL        |
| `updatePage`         | `(page: number) => void`                             | Update current page and sync to URL   |
| `updateSearchParams` | `(params: Record<string, string \| number>) => void` | Generic param updater                 |
| `clearAllFilters`    | `() => void`                                         | Clear all filters and reset to page 1 |
| `getParam`           | `(key: string) => string \| null`                    | Get a specific URL parameter          |
| `hasParam`           | `(key: string) => boolean`                           | Check if a parameter exists in URL    |

### Behavior

- **Filter updates**: When filters change, page is automatically reset to 1
- **Page updates**: Page changes are immediately reflected in the URL
- **Clean URLs**: Page parameter is removed when page is 1
- **State sync**: Component state stays in sync with URL changes (browser navigation)

## Migration from Manual Search Params

### Before

```tsx
// Old manual approach
const params = useParams();
const searchParams = useSearchParams();
const [filters, setFilters] = useState({
  ...params,
  ...Object.fromEntries(searchParams.entries()),
});

const setSearchParams = (newParams) => {
  // Manual URL management
};
```

### After

```tsx
// New hook approach
const { filters, updateFilters } = useSearchParamsManager();
```

## Examples

### Filter Updates

```tsx
// Update multiple filters at once
updateFilters({
  genres: JSON.stringify(["action", "drama"]),
  years: JSON.stringify([2020, 2021]),
  languages: JSON.stringify(["Georgian"]),
});
```

### Pagination

```tsx
// Update page
updatePage(3);

// Check current page
if (currentPage > 1) {
  // Show previous button
}
```

### Clear Filters

```tsx
// Reset everything
clearAllFilters();
```
