import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  price: number;
  is_free: boolean;
  is_published: boolean;
}

const getImageUrl = (path: string | null) => {
  if (!path) return "/thumbnails/bg.png";

  // If it's already a full URL, return it
  if (path.startsWith('http')) return path;

  // Handle blob URLs by mapping to available thumbnails
  if (path.includes('blob:')) {
    const availableThumbnails = [
      '/thumbnails/a5.jpg',
      '/thumbnails/a7.png',
      '/thumbnails/a8.jpg',
      '/thumbnails/a9.jpg',
      '/thumbnails/a10.jpg',
      '/thumbnails/a11.jpg',
      '/thumbnails/python.png',
      '/thumbnails/excel.png',
      '/thumbnails/ui ux.jpg',
      '/thumbnails/ai ds.jpg'
    ];

    const index = path.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % availableThumbnails.length;
    return availableThumbnails[index];
  }

  // Clean the path
  let cleanPath = path;
  if (path.startsWith('/')) {
    cleanPath = path.substring(1);
  }

  // If it's a relative path to thumbnails, just use it
  if (cleanPath.startsWith('thumbnails/')) {
    return `/${cleanPath}`;
  }
  
  return `http://localhost:5000/uploads/${cleanPath}`;
};

export const CourseCarousel: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      const publishedCourses = (data || []).filter((c: any) => c.is_published);
      setCourses(publishedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Featured Courses
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Available Courses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive courses designed to help you master new skills
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card 
                key={course.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border hover:border-primary/50 bg-card"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  {course.thumbnail_url ? (
                    <img
                      src={getImageUrl(course.thumbnail_url)}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== "/thumbnails/bg.png") {
                          target.src = "/thumbnails/bg.png";
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <BookOpen className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {course.is_free ? (
                      <Badge className="bg-green-500 text-white">Free</Badge>
                    ) : (
                      <Badge className="bg-primary text-primary-foreground">
                        ${course.price}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {course.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Self-paced</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>All levels</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => navigate('/login')}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};