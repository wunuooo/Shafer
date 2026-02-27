/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import SOSPage from './pages/SOSPage';
import CommunityPage from './pages/CommunityPage';
import GuardiansPage from './pages/GuardiansPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MapPage />} />
          <Route path="sos" element={<SOSPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="guardians" element={<GuardiansPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
