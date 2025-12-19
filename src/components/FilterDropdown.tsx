import { Filter, Calendar, SortAsc, SortDesc } from 'lucide-react';
import MenuDropdown from './MenuDropdown';

interface FilterDropdownProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortField: string;
  onSortFieldChange: (field: string) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  showCategoryFilter?: boolean;
}

const FilterDropdown = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  showCategoryFilter = true,
}: FilterDropdownProps) => {
  const categoryItems = categories.map(cat => ({
    id: cat,
    label: cat === 'all' ? 'Всі категорії' : cat,
    icon: <Filter className="h-5 w-5" />,
  }));

  const sortFieldItems = [
    { id: 'date', label: 'Датою', icon: <Calendar className="h-5 w-5" /> },
    { id: 'title', label: 'Назвою', icon: <Filter className="h-5 w-5" /> },
    { id: 'downloads', label: 'Популярністю', icon: <Filter className="h-5 w-5" /> },
  ];

  const sortOrderItems = [
    { id: 'asc', label: 'За зростанням', icon: <SortAsc className="h-5 w-5" /> },
    { id: 'desc', label: 'За спаданням', icon: <SortDesc className="h-5 w-5" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Category Filter */}
      {showCategoryFilter && (
        <MenuDropdown
          items={categoryItems}
          value={selectedCategory}
          onChange={onCategoryChange}
          label="Категорія"
          showIcons={true}
          showCheckmark={true}
        />
      )}

      {/* Sort Field */}
      <MenuDropdown
        items={sortFieldItems}
        value={sortField}
        onChange={onSortFieldChange}
        label="Сортувати за"
        showIcons={true}
        showCheckmark={true}
      />

      {/* Sort Order */}
      <MenuDropdown
        items={sortOrderItems}
        value={sortOrder}
        onChange={onSortOrderChange}
        label="Порядок"
        showIcons={true}
        showCheckmark={true}
      />
    </div>
  );
};

export default FilterDropdown;

