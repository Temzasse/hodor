// @ts-check
import { rule as noAccessStateInSetstate } from "./rules/no-access-state-in-setstate/rule.js";
import { rule as noClassComponent } from "./rules/no-class-component/rule.js";
import { rule as noContextProvider } from "./rules/no-context-provider/rule.js";
import { rule as noCreateRef } from "./rules/no-create-ref/rule.js";
import { rule as noDuplicateKey } from "./rules/no-duplicate-key/rule.js";
import { rule as noImplicitChildren } from "./rules/no-implicit-children/rule.js";
import { rule as noImplicitKey } from "./rules/no-implicit-key/rule.js";
import { rule as noImplicitRef } from "./rules/no-implicit-ref/rule.js";
import { rule as noLeakedConditionalRendering } from "./rules/no-leaked-conditional-rendering/rule.js";
import { rule as noMissingContextDisplayName } from "./rules/no-missing-context-display-name/rule.js";
import { rule as noMisusedCaptureOwnerStack } from "./rules/no-misused-capture-owner-stack/rule.js";
import { rule as noNestedLazyComponentDeclarations } from "./rules/no-nested-lazy-component-declarations/rule.js";
import { rule as noUnnecessaryUsePrefix } from "./rules/no-unnecessary-use-prefix/rule.js";
import { rule as noUnusedClassComponentMembers } from "./rules/no-unused-class-component-members/rule.js";
import { rule as noUnusedProps } from "./rules/no-unused-props/rule.js";
import { rule as noUnusedState } from "./rules/no-unused-state/rule.js";
import { rule as noUseContext } from "./rules/no-use-context/rule.js";
import { rule as noKeyAfterSpread } from "./rules/no-key-after-spread/rule.js";
import { rule as noLeakedDollar } from "./rules/no-leaked-dollar/rule.js";
import { rule as noLeakedSemicolon } from "./rules/no-leaked-semicolon/rule.js";
import { rule as noNamespace } from "./rules/no-namespace/rule.js";
import { rule as contextName } from "./rules/context-name/rule.js";
import { rule as functionDefinition } from "./rules/function-definition/rule.js";
import { rule as idName } from "./rules/id-name/rule.js";
import { rule as refName } from "./rules/ref-name/rule.js";
import { rule as noFindDomNode } from "./rules/no-find-dom-node/rule.js";
import { rule as noFlushSync } from "./rules/no-flush-sync/rule.js";
import { rule as noHydrate } from "./rules/no-hydrate/rule.js";
import { rule as noRender } from "./rules/no-render/rule.js";
import { rule as noUseFormState } from "./rules/no-use-form-state/rule.js";
import { rule as noLeakedEventListener } from "./rules/no-leaked-event-listener/rule.js";
import { rule as noLeakedFetch } from "./rules/no-leaked-fetch/rule.js";
import { rule as noLeakedIntersectionObserver } from "./rules/no-leaked-intersection-observer/rule.js";
import { rule as noLeakedInterval } from "./rules/no-leaked-interval/rule.js";
import { rule as noLeakedResizeObserver } from "./rules/no-leaked-resize-observer/rule.js";
import { rule as noLeakedTimeout } from "./rules/no-leaked-timeout/rule.js";
import { rule as noDefaultReactMemoization } from "./rules/no-default-react-memoization/rule.js";
import { rule as noForwardRef } from "./rules/no-forward-ref/rule.js";
import { rule as noFunctionDepsInEffect } from "./rules/no-function-deps-in-effect/rule.js";
import { rule as noPositionalFuncArgs } from "./rules/no-positional-func-args/rule.js";
import { rule as noReactFc } from "./rules/no-react-fc/rule.js";
import { createPlugin } from "./utils.js";

export const rules = {
  "no-access-state-in-setstate": noAccessStateInSetstate,
  "no-class-component": noClassComponent,
  "no-context-provider": noContextProvider,
  "no-create-ref": noCreateRef,
  "no-duplicate-key": noDuplicateKey,
  "no-implicit-children": noImplicitChildren,
  "no-implicit-key": noImplicitKey,
  "no-implicit-ref": noImplicitRef,
  "no-leaked-conditional-rendering": noLeakedConditionalRendering,
  "no-missing-context-display-name": noMissingContextDisplayName,
  "no-misused-capture-owner-stack": noMisusedCaptureOwnerStack,
  "no-nested-lazy-component-declarations": noNestedLazyComponentDeclarations,
  "no-unnecessary-use-prefix": noUnnecessaryUsePrefix,
  "no-unused-class-component-members": noUnusedClassComponentMembers,
  "no-unused-props": noUnusedProps,
  "no-unused-state": noUnusedState,
  "no-use-context": noUseContext,
  "no-key-after-spread": noKeyAfterSpread,
  "no-leaked-dollar": noLeakedDollar,
  "no-leaked-semicolon": noLeakedSemicolon,
  "no-namespace": noNamespace,
  "context-name": contextName,
  "function-definition": functionDefinition,
  "id-name": idName,
  "ref-name": refName,
  "no-find-dom-node": noFindDomNode,
  "no-flush-sync": noFlushSync,
  "no-hydrate": noHydrate,
  "no-render": noRender,
  "no-use-form-state": noUseFormState,
  "no-leaked-event-listener": noLeakedEventListener,
  "no-leaked-fetch": noLeakedFetch,
  "no-leaked-intersection-observer": noLeakedIntersectionObserver,
  "no-leaked-interval": noLeakedInterval,
  "no-leaked-resize-observer": noLeakedResizeObserver,
  "no-leaked-timeout": noLeakedTimeout,
  "no-react-fc": noReactFc,
  "no-forward-ref": noForwardRef,
  "no-default-react-memoization": noDefaultReactMemoization,
  "no-function-deps-in-effect": noFunctionDepsInEffect,
  "no-positional-func-args": noPositionalFuncArgs,
};

const hodor = createPlugin({
  name: "hodor",
  rules,
});

export default hodor;
