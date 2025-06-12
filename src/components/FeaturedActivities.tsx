interface FeaturedActivity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
}

interface FeaturedActivitiesProps {
  region: string;
  activities: FeaturedActivity[];
}

export default function FeaturedActivities({ region, activities }: FeaturedActivitiesProps) {
  return (
    <section className="py-12 bg-white/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">本季热门活动</h2>
          <p className="text-gray-600">为您精选{region}当前最受欢迎的活动</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-gray-300/40 shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/15 transition-shadow duration-300"
            >
              {/* 1:1 图片预留区域 */}
              <div className={`aspect-square bg-gradient-to-br ${activity.bgColor} flex items-center justify-center`}>
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">照片预留区域</span>
                </div>
              </div>
              {/* 文字内容区域 */}
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-3xl">{activity.emoji}</span>
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 