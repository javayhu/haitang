import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 验证邮箱地址格式
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // 验证密码长度
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  // 处理邮箱登录
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit, email:', email);
    e.preventDefault(); // 阻止表单默认提交行为

    // 清除之前的错误消息
    setErrorMessage('');

    // 验证邮箱和密码
    if (!validateEmail(email)) {
      setErrorMessage('请输入有效的邮箱地址');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('密码长度至少为6个字符');
      return;
    }

    // 发送登录请求
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('signin error, data:', data);
        throw new Error(data.message || '登录失败，请稍后再试');
      }

      console.log('signin success', data);
      toast.success('登录成功，进入诗社中...');
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('signin error, data:', error);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  // 处理Github登录
  const handleGithubSubmit = async (e: any) => {
    console.log('handleGithubSubmit');
    e.preventDefault(); // 阻止表单默认提交行为

    // 清除之前的错误消息
    setErrorMessage('');

    // 发送登录请求
    try {
      setIsGithubLoading(true);
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'provider': 'github' }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('signin error, data:', data);
        throw new Error(data.message || '登录失败，请稍后再试');
      }

      console.log('signin success', data);
      toast.success('Github登录授权，页面跳转中...');
      // window.location.href = '/dashboard';
      window.location.href = data.url;
    } catch (error: any) {
      console.error('signin github error, data:', error);
      // setErrorMessage(error.message);
      toast.error(error.message);
    }
    setIsGithubLoading(false);
  };

  return (
    <section className="w-full max-w-md">
      <h1 className="font-semibold text-2xl dark:text-zinc-100 text-zinc-900 w-full mb-1">
        登录
      </h1>
      <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm mb-8 w-full">
        若已注册账号，记得检查邮件确认邮箱，若还没有账号?&nbsp;
        <a data-astro-reload href="/register" className="dark:text-blue-400 text-blue-600 underline underline-offset-2 font-medium">
        注册
        </a>
      </p>
      
      <form data-astro-reload onSubmit={handleSubmit} method="post" className="grid grid-cols-1 gap-3 w-full">
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="email" className="font-medium dark:text-zinc-300 text-zinc-900 text-sm">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md py-2 px-3 text-sm dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="password" className="font-medium dark:text-zinc-300 text-zinc-900 text-sm">
            密码
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md py-2 px-3 text-sm dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
          />
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <Button variant="default" size="sm" className="py-2 mt-4 font-medium text-sm" disabled={isLoading} type="submit">
          {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />登录
                </>
            ) : '登录'
          }
        </Button>
      </form>
      <hr className="h-0 border-t mt-8 dark:border-zinc-600 border-zinc-300" />
      <p className="-mt-2.5 text-xs text-center dark:text-zinc-400 text-zinc-500">
        <span className="dark:bg-zinc-900 bg-zinc-50 px-4 py-1 rounded">
          其他方式登录
        </span>
      </p>
      <form
        data-astro-reload
        method="post"
        className="w-full max-w-md mt-6 flex flex-col gap-2"
      >
        <Button onClick={handleGithubSubmit} variant="default" size="sm" className="py-2 mt-4 font-medium text-sm" disabled={isGithubLoading} type="button">
          {isGithubLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : <></>
          }
          Github账号登录
        </Button>
      </form>
    </section>
  );
};

export default SigninForm;
