import { useMachine, useSelector } from '@xstate/react';

import type { ImportAccountMachineState } from '../machines';
import { importAccountMachine } from '../machines';

import type { AccountInputs } from '~/systems/Account';

const selectors = {
  isLoading: (state: ImportAccountMachineState) => state.hasTag('loading'),
};

export function useImportAccount() {
  const [, send, service] = useMachine(importAccountMachine);

  const isLoading = useSelector(service, selectors.isLoading);
  const importAccount = (input: AccountInputs['importAccount']) => {
    send('IMPORT_ACCOUNT', { input });
  };

  return {
    handlers: {
      importAccount,
    },
    isLoading,
  };
}
