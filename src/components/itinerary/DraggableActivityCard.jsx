import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit2, Trash2, Clock, DollarSign } from 'lucide-react';
import { estimateActivityCost, formatCurrency } from '../../utils/budgetCalculator';

const DraggableActivityCard = ({ activity, onEdit, onRemove, budget = 'medium', travelers = 1, isDragging = false }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isSortableDragging,
    } = useSortable({ id: activity.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isSortableDragging ? 0.5 : 1,
    };

    const cost = estimateActivityCost(activity, budget, travelers);
    const timeEmoji = {
        morning: '🌅',
        afternoon: '☀️',
        evening: '🌆',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative bg-white rounded-xl border-2 ${isSortableDragging ? 'border-primary-400 shadow-xl' : 'border-gray-200'
                } hover:border-primary-300 transition-all`}
        >
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <button
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg transition-colors mt-1"
                        aria-label="Drag to reorder"
                    >
                        <GripVertical className="w-5 h-5 text-gray-400" />
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{timeEmoji[activity.time]}</span>
                                <div>
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                                        {activity.time}
                                    </span>
                                    <h4 className="font-bold text-gray-900 text-lg">{activity.name}</h4>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{activity.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {activity.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            {activity.duration && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{activity.duration}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-semibold">{formatCurrency(cost.total)}</span>
                                <span className="text-xs text-gray-500">({cost.symbol})</span>
                            </div>
                        </div>

                        {activity.notes && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800 italic">
                                    <strong>Note:</strong> {activity.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(activity)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            aria-label="Edit activity"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onRemove(activity.id)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            aria-label="Remove activity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraggableActivityCard;
