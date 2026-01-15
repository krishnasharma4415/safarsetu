import { useState } from 'react';
import { Calendar, Plus, Edit3 } from 'lucide-react';
import ActivityCard from './ActivityCard';
import Modal from '../ui/Modal';

const DayCard = ({ day, dayIndex, onUpdateActivity, onRemoveActivity, onAddActivity, onUpdateNotes, readOnly }) => {
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const [notes, setNotes] = useState(day.notes || '');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);

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

                <div className="space-y-4">
                    {day.activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            onRemove={() => onRemoveActivity(dayIndex, activity.id)}
                            onEdit={handleEditActivity}
                            readOnly={readOnly}
                        />
                    ))}
                </div>

                {!readOnly && day.activities.length < 4 && (
                    <button
                        className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Add Custom Activity
                    </button>
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
                    <button
                        onClick={() => setIsNotesModalOpen(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button onClick={handleSaveNotes} className="btn-primary">
                        Save Notes
                    </button>
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
                            <p className="text-sm text-gray-600">{editingActivity.duration}</p>
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
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingActivity(null);
                                }}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default DayCard;
