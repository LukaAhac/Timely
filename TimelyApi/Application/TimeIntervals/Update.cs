using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using TimelyApi.Application.Core;
using TimelyApi.Data;
using TimelyApi.Models;

namespace TimelyApi.Application.TimeIntervals
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set;}
            public TimeInterval timeInterval { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentTimeInterval = await _context.TimeIntervals.FindAsync(request.id);

                if (currentTimeInterval == null){
                    return null;
                }

                currentTimeInterval.ProjectName = request.timeInterval.ProjectName;
                currentTimeInterval.TimeStart = request.timeInterval.TimeStart;
                currentTimeInterval.TimeEnd = request.timeInterval.TimeEnd;

                bool result = await _context.SaveChangesAsync() > 0;

                if(!result){
                    return Result<Unit>.Failure("Failed to update activity");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}