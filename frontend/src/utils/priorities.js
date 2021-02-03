import React from 'react';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';

export default {
  1: {
    color: '#55A557',
    name: 'lowest',
    value: 1,
    icon: function () {
      return <HiArrowDown color={this.color} />;
    },
  },
  2: {
    color: '#2A8735',
    name: 'low',
    value: 2,
    icon: function () {
      return <HiArrowDown color={this.color} />;
    },
  },
  3: {
    color: '#EA7D24',
    name: 'medium',
    value: 3,
    icon: function () {
      return <HiArrowUp color={this.color} />;
    },
  },
  4: {
    color: '#EA4444',
    name: 'high',
    value: 4,
    icon: function () {
      return <HiArrowUp color={this.color} />;
    },
  },
  5: {
    color: '#CE0000',
    name: 'highest',
    value: 5,
    icon: function () {
      return <HiArrowUp color={this.color} />;
    },
  },
};
