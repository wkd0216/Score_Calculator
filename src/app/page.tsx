
import { CalculatorRoot } from "@/components/calculator-root";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center">
      {/* 상단 디자인 영역 */}
      <div className="absolute top-0 left-0 w-full h-[400px] overflow-hidden z-0">
        <div 
          className="w-[150%] h-[500px] absolute -top-[100px] -left-[25%] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent transform -skew-y-12"
        />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <header className="text-center mb-12 animate-in fade-in slide-in-from-top-12 duration-500">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary font-headline">
            학점 계산기
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            당신의 학점을 손쉽게 계산하고 관리하세요.
          </p>
        </header>

        <CalculatorRoot />
      </main>

      <footer className="w-full py-6 text-center z-10 mt-auto">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} My Grade Calculator. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
