import React, { memo, cloneElement } from 'react';

// Local
import { AuthStore } from './auth/store';
import { SidebarStore } from './sidebar/store';
import { OrganizationStore } from './organization/store';
import { HistorialStore } from './historial/store';
import { UserSettingsStore } from './userSettings/store';
import { UserDetailsStore } from './userDetails/store';
import { SettingsStore } from './settings/store';
import { TaskStore } from './task/store';
import { SprintStore } from './sprint/store';

const providers = [
  <AuthStore.Provider />,
  <HistorialStore.Provider />,
  <OrganizationStore.Provider />,
  <TaskStore.Provider />,
  <SettingsStore.Provider />,
  <SidebarStore.Provider />,
  <SprintStore.Provider />,
  <UserSettingsStore.Provider />,
  <UserDetailsStore.Provider />,
];

const Store = ({ children: initial }) => providers.reduce((children, parent) => cloneElement(parent, { children }), initial);

export default memo(Store);
