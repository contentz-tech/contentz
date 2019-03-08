const { createContext, useContext } = require("react");
const { jsx } = require("@emotion/core");

const i18n = createContext(null);

function IntlProvider({ locale, messages, children }) {
  return jsx(i18n.Provider, { value: { locale, messages } }, children);
}

exports.IntlProvider = IntlProvider;

function useIntl() {
  return useContext(i18n);
}

exports.useIntl = useIntl;
