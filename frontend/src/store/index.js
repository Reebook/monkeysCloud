import React, { memo, cloneElement } from 'react';

// Local
import { AuthStore } from './auth/store';
import { CompanyDetailsStore } from './companyDetails/store';
import { CompanyStore } from './companies/store';
import { SidebarStore } from './sidebar/store';
import { OrganizationStore } from './organization/store';
import { HistorialStore } from './historial/store';
import { UserSettingsStore } from './userSettings/store';
import { UserDetailsStore } from './userDetails/store';
import { SettingsStore } from './settings/store';
import { TaskStore } from './task/store';
import { ProjectStore } from './projects/store';
import { SprintStore } from './sprint/store';

const providers = [
  <AuthStore.Provider />,
  <CompanyDetailsStore.Provider />,
  <CompanyStore.Provider />,
  <HistorialStore.Provider />,
  <OrganizationStore.Provider />,
  <ProjectStore.Provider />,
  <TaskStore.Provider />,
  <SettingsStore.Provider />,
  <SidebarStore.Provider />,
  <SprintStore.Provider />,
  <UserSettingsStore.Provider />,
  <UserDetailsStore.Provider />,
];

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  );

export default memo(Store);
