import { useState } from 'react';
import { Calendar, Plus, Edit3 } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import DraggableActivityCard from './DraggableActivityCard';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const DayCard = ({ day, dayIndex, onUpdateActivity, onRemoveActivity, onUpdateNotes, onReorderActivities, readOnly, tripDetails }) => {
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const [notes, setNotes] = useState(day.notes || '');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleSaveNotes = () => {
        onUpdateNotes(dayIndex, notes);
        setIsNotesModalOpen(false);
    };

    const handleEditActivity = (activity) => {
        setEditingActivity(activity);
        setIsEditModalOpen(true);
    };

    const handleSaveActivity = (e) => {
        e.preventDefault();
        onUpdateActivity(dayIndex, editingActivity.id, {
            notes: editingActivity.notes,
        });
        setIsEditModalOpen(false);
        setEditingActivity(null);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = day.activities.findIndex((a) => a.id === active.id);
            const newIndex = day.activities.findIndex((a) => a.id === over.id);

            const newActivities = arrayMove(day.activities, oldIndex, newIndex);
            onReorderActivities(dayIndex, newActivities);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="card animate-slide-up">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-5 h-5 text-primary-500" />
                            <h3 className="text-2xl font-bold text-gray-900">Day {day.day}</h3>
                        </div>
                        <p className="text-gray-600">{formatDate(day.date)}</p>
                    </div>

                    {!readOnly && (
                        <button
                            onClick={() => setIsNotesModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                            {day.notes ? 'Edit Notes' : 'Add Notes'}
                        </button>
                    )}
                </div>

                {day.notes && (
                    <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl">
                        <p className="text-sm text-gray-700 font-medium">📝 {day.notes}</p>
                    </div>
                )}

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={day.activities.map((a) => a.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4">
                            {day.activities.map((activity) => (
                                <DraggableActivityCard
                                    key={activity.id}
                                    activity={activity}
                                    onRemove={() => onRemoveActivity(dayIndex, activity.id)}
                                    onEdit={handleEditActivity}
                                    budget={tripDetails?.budget || 'medium'}
                                    travelers={tripDetails?.travelers || 1}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                {!readOnly && day.activities.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <p>No activities for this day yet</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isNotesModalOpen}
                onClose={() => setIsNotesModalOpen(false)}
                title="Day Notes"
            >
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes for this day (e.g., booking confirmations, reminders, tips...)"
                    className="input-field min-h-[150px] resize-none"
                />
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setIsNotesModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSaveNotes}>
                        Save Notes
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingActivity(null);
                }}
                title="Edit Activity"
            >
                {editingActivity && (
                    <form onSubmit={handleSaveActivity}>
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2">{editingActivity.name}</h3>
                            <p className="text-sm text-gray-600">{editingActivity.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{editingActivity.duration}</p>
                        </div>

                        <label className="label">Activity Notes</label>
                        <textarea
                            value={editingActivity.notes || ''}
                            onChange={(e) =>
                                setEditingActivity({ ...editingActivity, notes: e.target.value })
                            }
                            placeholder="Add personal notes or modifications..."
                            className="input-field min-h-[100px] resize-none"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingActivity(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default DayCard;
