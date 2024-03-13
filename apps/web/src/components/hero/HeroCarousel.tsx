'use client';

import Autoplay from 'embla-carousel-autoplay';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function HeroCarousel() {
  const [displayMove, setDisplayMove] = useState(false);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      onMouseOver={() => setDisplayMove(true)}
      onMouseOut={() => setDisplayMove(false)}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <AspectRatio ratio={3 / 1} className="flex items-center justify-center">
                  <CardContent className="flex items-center justify-center">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </AspectRatio>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={`transition-all duration-300 ${displayMove ? 'absolute left-2 opacity-100' : 'left-6 opacity-0'}`}
      />
      <CarouselNext
        className={`transition-all duration-300 ${displayMove ? 'absolute right-2 opacity-100' : 'right-6 opacity-0'}`}
      />
    </Carousel>
    // </AspectRatio>
  );
}
