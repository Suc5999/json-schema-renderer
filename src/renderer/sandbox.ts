import { merge } from 'lodash-es';


/**
 * 沙箱的执行上下文，沙箱可访问的全局方法，如请求、弹窗，组件上下文等
 */
export const sandboxContext: Record<string, any> = {}

/**
 * 创建函数
 */
function withCode(code: string, getDynamicCtx: any) {
  code = 'with (ctx) {' + code + '}';
  const fn = new Function('ctx', code);

  return async function () {
    registerSandboxContext(getDynamicCtx())
    const sandboxProxy = new Proxy(sandboxContext, {
      set: (target, prop, receiver) => {
        target[prop as string] = receiver;
        return true;
      },
      get(target, key) {
        if (key === Symbol.unscopables) return undefined;
        return target[key as string] ;
      },
    });
    return await fn(sandboxProxy);
  };
}

/**
 * 注册沙箱上下文
 */
export function registerSandboxContext(target: Record<string, any>) {
  try {
    merge(sandboxContext, target);
  } catch (error) {
    throw `registerSandboxContext err:` + error;
  }
}

/**
 * 创建沙箱
*/
export function createSandBox(code: string, getDynamicCtx: any) {
  return withCode(code, getDynamicCtx)
}

