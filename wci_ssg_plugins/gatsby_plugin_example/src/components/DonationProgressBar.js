import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from './ProgressProvider';

const DonationProgressBar = props => {
  const { totalCost, donationReceived } = getDonationStats();
  const percent = Math.round((donationReceived / totalCost) * 100);
  return <CircleProgressBar percent={percent} text={`${percent}%`} />;
};

export const CircleProgressBar = props => {
  return (
    <ProgressProvider valueStart={0} valueEnd={props.percent}>
      {value => (
        <CircularProgressbar
          value={value}
          text={props.text || `${props.percent}%`}
          styles={buildStyles({
            pathTransitionDuration: 2,
            pathColor: '#3e8ed0',
            textColor: '#3e8ed0'
          })}
        />
      )}
    </ProgressProvider>
  );
};

export const DonationProgressText = props => {
  const { totalCost, donationReceived } = getDonationStats();
  return (
    <>
      €{donationReceived} of €{totalCost}
    </>
  );
};

function loadProjectsFromJSON() {
  // Get all the Project JSON files
  const requireContext = require.context('../../content/projects/', false, /\.json$/);
  const allProjects = {};
  requireContext.keys().forEach(key => {
    const projectObj = requireContext(key);
    const fileNameKey = key.split('/').pop().split('.').shift(); // Example: './foo.json' becomes 'foo'
    allProjects[fileNameKey] = projectObj;
  });
  return allProjects;
}

export function getDonationStats() {
  const allProjects = loadProjectsFromJSON();
  let totalCost = 0;
  for (const project in allProjects) {
    if (allProjects[project]['is_active']) {
      totalCost += allProjects[project]['costs']['total'];
    }
  }

  //TODO: Get total donated amount.
  const donationReceived = 530.96 - totalCost;

  return { totalCost, donationReceived };
}

export default DonationProgressBar;
