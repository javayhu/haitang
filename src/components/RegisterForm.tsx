import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  // 处理表单提交
  const handleSubmit = async (e) => {
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

    // 发送注册请求
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('register error, data:', data);
        throw new Error(data.message || '注册失败，请稍后再试');
      }

      console.log('register success', data);
      toast.success('注册成功，请前往邮箱确认');
      window.location.href = '/signin';
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <section className="w-full max-w-md">
      <h1 className="font-semibold text-2xl dark:text-zinc-100 text-zinc-900 w-full mb-1">
        注册
      </h1>
      <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm mb-8 w-full">
        若注册新账号，记得检查邮件确认邮箱，若已注册账号?&nbsp;
        <a data-astro-reload href="/signin" className="dark:text-blue-400 text-blue-600 underline underline-offset-2 font-medium">
        登录
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
            placeholder="密码长度至少为6个字符"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md py-2 px-3 text-sm dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
          />
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <Button variant="default" size="sm" className="py-2 mt-4 font-medium text-sm" disabled={isLoading} type="submit">
          {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : <></>
          }注册
        </Button>
      </form>
    </section>
  );
};

export default RegisterForm;
