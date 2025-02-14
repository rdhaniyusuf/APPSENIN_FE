import { TabsAnalitycComp } from '@/components/dashboard/analityc/AnalitycComp';
import React from 'react';

const AnalyticPage: React.FC = () => {
    return (
        <div>
            <h1>Analytic Page</h1>
            <p>Welcome to the analytic page. Here you can view various analytics and reports.</p>
            <TabsAnalitycComp/>
        </div>
    );
};

export default AnalyticPage;