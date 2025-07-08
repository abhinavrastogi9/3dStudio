"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Box,
  Upload,
  Eye,
  Zap,
  Shield,
  Users,
  Star,
  ArrowRight,
  Check,
  Play,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Box className="h-8 w-8 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">3D Studio</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/signin">
                <Button variant="outline" className="bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Visualize & Manage Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                3D Models
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload, visualize, and manage your 3D models with ease. Support
              for OBJ, GLB . Perfect for designers, developers, and 3D
              enthusiasts.
            </p>
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gray-100 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Box className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                      Interactive 3D Model Viewer
                    </p>
                    <p className="text-sm text-gray-500">
                      Upload your models to see them here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for 3D model management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools to upload, visualize, and organize your 3D models
              in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Easy Upload</CardTitle>
                <CardDescription>
                  Drag and drop your 3D models or browse to upload. Supports
                  OBJ, GLB .
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Interactive Viewer</CardTitle>
                <CardDescription>
                  View your 3D models with full rotation, zoom, and pan
                  controls. Save camera states for later.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Box className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Model Management</CardTitle>
                <CardDescription>
                  Organize your models with detailed metadata, thumbnails, and
                  easy search functionality.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with 3D Studio in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Your Models
              </h3>
              <p className="text-gray-600">
                Drag and drop your 3D model files or browse to upload. We
                support all major 3D file formats.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Visualize & Explore
              </h3>
              <p className="text-gray-600">
                View your models in our interactive 3D viewer with full
                rotation, zoom, and lighting controls.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Manage & Share
              </h3>
              <p className="text-gray-600">
                Organize your models, save camera states, and share with your
                team or clients effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
