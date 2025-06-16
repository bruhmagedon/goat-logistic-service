import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { ReactNode } from 'react';

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: ReactNode;
  title: ReactNode;
  description: ReactNode;
  footerText?: ReactNode;
}) {
  return (
    <main className="flex grow flex-col items-center pt-25">
      <Card className="w-full max-w-100">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        {footerText && (
          <CardFooter>
            <p className="test-sm text-muted-foreground [&_a]:text-primary [&_a]:underline ">{footerText}</p>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
