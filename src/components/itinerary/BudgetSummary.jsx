import { DollarSign, TrendingUp, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { calculateTripBudget, formatCurrency, getBudgetInsights } from '../../utils/budgetCalculator';

const BudgetSummary = ({ itinerary, tripDetails }) => {
    if (!itinerary || !tripDetails) return null;

    const budget = calculateTripBudget(
        itinerary,
        tripDetails.budget || 'medium',
        tripDetails.travelers || 1
    );

    const insights = getBudgetInsights(budget);

    const getInsightIcon = (type) => {
        switch (type) {
            case 'warning':
                return <AlertCircle className="w-4 h-4" />;
            case 'info':
                return <Info className="w-4 h-4" />;
            case 'success':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <TrendingUp className="w-4 h-4" />;
        }
    };

    const getInsightColor = (type) => {
        switch (type) {
            case 'warning':
                return 'bg-orange-50 border-orange-200 text-orange-700';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-700';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-700';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                    <DollarSign className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Budget Estimate</h2>
                    <p className="text-sm text-gray-600">Estimated costs for your trip</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                    <p className="text-sm font-semibold text-primary-700 mb-2">Total Trip Cost</p>
                    <p className="text-4xl font-bold text-primary-900">{formatCurrency(budget.total)}</p>
                    <p className="text-sm text-primary-600 mt-2">
                        {formatCurrency(budget.range.min)} - {formatCurrency(budget.range.max)} range
                    </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl border border-secondary-200">
                    <p className="text-sm font-semibold text-secondary-700 mb-2">Per Person</p>
                    <p className="text-4xl font-bold text-secondary-900">{formatCurrency(budget.perPerson)}</p>
                    <p className="text-sm text-secondary-600 mt-2">
                        For {tripDetails.travelers} traveler{tripDetails.travelers > 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Cost Breakdown</h3>

                {Object.entries(budget.breakdown).map(([category, amount]) => {
                    const percentage = (amount / budget.total) * 100;
                    return (
                        <div key={category} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-700 capitalize">{category}</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</p>
                        </div>
                    );
                })}
            </div>

            {insights.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 mb-3">Budget Insights</h3>
                    {insights.map((insight, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 p-4 rounded-xl border ${getInsightColor(insight.type)}`}
                        >
                            {getInsightIcon(insight.type)}
                            <p className="text-sm flex-1">{insight.message}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-600">
                    <strong>Note:</strong> These are estimated costs based on average prices. Actual costs may vary
                    depending on season, availability, and personal choices. Always budget extra for unexpected expenses.
                </p>
            </div>
        </div>
    );
};

export default BudgetSummary;
